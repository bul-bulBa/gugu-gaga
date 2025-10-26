import { ObjectId } from 'mongodb'
import postModel from '../models/post-model.js'
import ApiError from '../exceptions/api-error.js'
import tokenService from './token-service.js'

class postService {
    async newPost(token, text) {
        const {id} = tokenService.validateAccessToken(token)
        if(!id) throw ApiError.Unauthorized()

        await postModel.create({userId: id, text})
        return
    }
    async deletePost(postId) {
        await postModel.findByIdAndDelete(postId)
        return
    }

    async getPosts(lastId) {

        // pagination of posts
        const matchStage = lastId
            ? { $match: { _id: { $lt: new ObjectId(lastId) } } }
            : { $match: {} }

        const posts = await postModel.aggregate([
            matchStage,
          { $sort: { _id: -1 } },
          { $limit: 5 },
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
          { $project: { text: 1, 'user.name': 1, 'user.avatar': 1 } }
        ])

        return posts
    }
}

export default new postService