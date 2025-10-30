import ApiError from '../exceptions/api-error.js'
import tokenModel from '../models/token-model.js'
import postService from '../service/post-service.js'
import tokenService from '../service/token-service.js'

class postController {
    async newPost(req, res, next) {
        try{
            const {accessToken} = req.cookies
            const {text} = req.body

            const post = await postService.newPost(accessToken, text)

            res.json(post)
        }catch(e) {
            next(e)
        }
    }
    async deletePost(req, res, next) {
        try{
            const {id} = req.params
            
            await postService.deletePost(id)
            res.json({message: 'post has been deleted'})
        }catch(e) {
            next(e)
        }
    }
    async getPosts(req, res, next) {
        try{
            const {lastId} = req.query
            const {userId} = req.query
            const {accessToken} = req.cookies

            const posts = await postService.getPosts(lastId, userId, accessToken)

            res.json(posts)
        }catch(e) {
            next(e)
        }
    }
    async toggleLikes(req, res, next) {
        try{
            const {postId} = req.body
            const {userId} = req.body
            const {accessToken} = req.cookies

            const post = await postService.toggleLikes(accessToken, userId, postId)
            res.json(post)
        }catch(e) {
            next(e)
        }
    }
    // async getUserPosts(req, res, next) {
    //     try{
    //         const {accessToken} = req.cookies
    //         const {id} = req.query

    //         const posts = await postService.getUserPosts(accessToken, id)
            
    //         res.json(posts)
    //     }catch(e) {
    //         next(e)
    //     } 
    // }
}

export default new postController