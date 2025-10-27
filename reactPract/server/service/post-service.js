import { ObjectId } from 'mongodb'
import postModel from '../models/post-model.js'
import userModel from '../models/user-model.js'
import ApiError from '../exceptions/api-error.js'
import tokenService from './token-service.js'

class postService {
    async newPost(token, TEXT) {
        const {id} = tokenService.validateAccessToken(token)
        if(!id) throw ApiError.Unauthorized()
        const user = await userModel.findById(id)

        const post = await postModel.create({userId: id, text: TEXT})
        // toObject перетворює mongoose object з додатковими методами у звичайний об'єкт
        const {_id, text} = post.toObject()

        return { _id, text, user: {name: user.name, avatar: user.avatar, _id: user._id}}
    }
    async deletePost(postId) {
        await postModel.findByIdAndDelete(postId)
        return
    }

    async getPosts(lastId, userId) {

        // pagination of posts
        const match = {}
        if(lastId) match._id = { $lt: new ObjectId(lastId) } 
        if(userId) match.userId = new ObjectId(userId)

        const posts = await postModel.aggregate([
          { $match: match},
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
          {
            $project: {
              _id: 1,
              text: 1,
              'user._id': 1,
              'user.name': 1,
              'user.avatar': 1,
            }
          }
        ])

        return posts
    }

    async getUserPosts(token, lastId) {
        const {id} = tokenService.validateAccessToken(token)
        if(!id) throw ApiError.Unauthorized()
            console.log(id)
        const matchStage = { userId: new ObjectId(id) }
        if (lastId && ObjectId.isValid(lastId)) {
          matchStage._id = { $lt: new ObjectId(lastId) } 
        }

        const posts = await postModel.aggregate([
          { $match: matchStage },
          { $sort: { _id: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: '$user' },
          { $project: { text: 1, 'user._id': 1, 'user.name': 1, 'user.avatar': 1 } }
        ])

        return posts
    }
}

export default new postService