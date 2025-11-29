import { ObjectId } from 'mongodb'
import postModel from '../models/post-model.js'
import likesModel from '../models/likes-model.js'
import userModel from '../models/user-model.js'
import imageModel from '../models/image-model.js'
import PostDto from '../dto/post-dto.js'
import ApiError from '../exceptions/api-error.js'
import tokenService from './token-service.js'

class postService {
    async newPost(token, TEXT, file) {
        const {id} = tokenService.validateAccessToken(token)
        if(!id) throw ApiError.Unauthorized()
        const user = await userModel.findById(id) 
        console.log(file.length)
        let post = await postModel.create({userId: id, text: TEXT, likes: 0})
        if(file && file.length > 0) post = await this.addFileToPost(file, post._id)

        const postDto = new PostDto(post, user, null, null)

        return postDto
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
              img: 1,
              'user._id': 1,
              'user.name': 1,
              'user.avatar': 1,
              repliedPost: {
                text: '$repliedPostData.text',
                img: '$repliedPostData.img',
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
        if(repliedPost) reply = {text: repliedPost.text, name: repliedUser.name, avatar: repliedUser.avatar, img: repliedPost.img}
      }

        return { 
          user: {_id: user._id, name: user.name, avatar: user.avatar}, 
          text: updatedPost.text, 
          _id: updatedPost._id, 
          likes: updatedPost.likes,
          img: updatedPost.img,
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

      const postDto = new PostDto(reply, user, repliedPost, repliedUser)

      return postDto
    }

    async addFileToPost(file, postId) {
      const images = file.map(file => {
        return new imageModel({
          data: file.buffer,
          filename: file.originalname,
          contentType: file.mimetype
        })
      })
      const saved = await Promise.all(images.map(i => i.save()))
      const urls = saved.map(i => ({
        url: `http://localhost:${process.env.PORT}/api/image/${i._id}`,
        type: i.contentType
      }))

      const post = await postModel.findByIdAndUpdate(
        postId,
        { $push: { img: { $each: urls } } },
        { new: true }
      )

      return post
    }
}

export default new postService