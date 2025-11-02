import { ObjectId } from 'mongodb'
import postModel from '../models/post-model.js'
import likesModel from '../models/likes-model.js'
import userModel from '../models/user-model.js'
import ApiError from '../exceptions/api-error.js'
import tokenService from './token-service.js'

class postService {
    async newPost(token, TEXT) {
        const {id} = tokenService.validateAccessToken(token)
        if(!id) throw ApiError.Unauthorized()
        const user = await userModel.findById(id)

        const post = await postModel.create({userId: id, text: TEXT, likes: 0})
        // toObject перетворює mongoose object з додатковими методами у звичайний об'єкт
        const {_id, text, likes} = post.toObject()

        return { _id, text, likes, user: {name: user.name, avatar: user.avatar, _id: user._id}}
    }

    async deletePost(postId) {
        await postModel.findByIdAndDelete(postId)
        return
    }

    async getPosts(lastId, userId, token) {
        let currentUserId
        if(token) {
          const {id} = tokenService.validateAccessToken(token)
          currentUserId = id
        }
        const currentUserIdStr = currentUserId ? String(currentUserId) : null

        // pagination of posts
        const match = {}
        if(lastId) match._id = { $lt: new ObjectId(lastId) } 
        if(userId) match.userId = new ObjectId(userId)

        const posts = await postModel.aggregate([
          { $match: match },
          { $sort: { _id: -1 } },
          { $limit: 3 },

          {
            $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
            }
          },
          { $unwind: '$user' },

          // якщо пост — це reply, підтягуємо оригінальний пост
          {
            $lookup: {
              from: 'posts',
              localField: 'repliedPost.postId',
              foreignField: '_id',
              as: 'repliedPostData'
            }
          },
          { $unwind: { path: '$repliedPostData', preserveNullAndEmptyArrays: true } },
        
          // тягнемо автора того поста, на який відповіли
          {
            $lookup: {
              from: 'users',
              localField: 'repliedPostData.userId',
              foreignField: '_id',
              as: 'repliedUser'
            }
          },
          { $unwind: { path: '$repliedUser', preserveNullAndEmptyArrays: true } },

          ...(currentUserId
          ? [{
              $lookup: {
                from: 'likes',
                let: { postId: '$_id' },
                pipeline: [
                  { $match: {
                      $expr: {
                        $and: [
                          { $eq: [ { $toString: '$postId' }, { $toString: '$$postId' } ] },
                          { $eq: [ { $toString: '$userId' }, currentUserIdStr ] }
                        ]
                      }
                    }
                  }
                ],
                as: 'userLiked'
              }
            },
            { $addFields: { liked: { $gt: [{ $size: '$userLiked' }, 0] } } }
            ]
            : [{ $addFields: { liked: false } }]
          ),
          {
            $project: {
              _id: 1,
              text: 1,
              likes: 1,
              liked: 1,
              'user._id': 1,
              'user.name': 1,
              'user.avatar': 1,
              repliedPost: {
                text: '$repliedPostData.text',
                name: '$repliedUser.name',
                avatar: '$repliedUser.avatar'
              }
            }
          }
        ])

        return posts
    }

    async toggleLikes(token, authorId, postId) {
      const {id} = tokenService.validateAccessToken(token)

      const like = await likesModel.findOne({userId: id, postId})
      const user = await userModel.findById(authorId)

      let updatedPost
      let liked
    
      if(like) {
        await like.deleteOne()
        updatedPost = await postModel.findByIdAndUpdate( postId, { $inc: { likes: -1 }}, { new: true})
        liked = false
      } else {
        await likesModel.create({ userId: id, postId})
        updatedPost = await postModel.findByIdAndUpdate( postId, { $inc: { likes: 1 }}, { new: true })
        liked = true
      }

      let reply = {}
      if(updatedPost.repliedPost?.postId) {
        const repliedPost = await postModel.findById(updatedPost.repliedPost.postId)
        const repliedUser = await userModel.findById(updatedPost.repliedPost.userId)
        if(repliedPost) reply = {text: repliedPost.text, name: repliedUser.name, avatar: repliedUser.avatar}
      }

        return { 
          user: {_id: user._id, name: user.name, avatar: user.avatar}, 
          text: updatedPost.text, 
          _id: updatedPost._id, 
          likes: updatedPost.likes,
          liked,
          repliedPost: reply}
    } 

    async replyPost(token, TEXT, repliedPostId, repliedUserId) { 
      const {id} = tokenService.validateAccessToken(token)
      if(!id) throw ApiError.Unauthorized()
      
      const user = await userModel.findById(id)
      const repliedUser = await userModel.findById(repliedUserId)
      const repliedPost = await postModel.findById(repliedPostId)

      const reply = await postModel.create({userId: id, text: TEXT, likes: 0, 
        repliedPost:{userId: repliedUserId, postId: repliedPostId}})

        const { _id, text, likes} = reply.toObject()

      return { _id, text, likes, 
        user: {name: user.name, avatar: user.avatar, _id: user._id}, 
        repliedPost:{name: repliedUser.name, avatar: repliedUser.avatar, text: repliedPost.text} }
    }
}

export default new postService