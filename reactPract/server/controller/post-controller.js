import ApiError from '../exceptions/api-error.js'
import tokenModel from '../models/token-model.js'
import postService from '../service/post-service.js'
import tokenService from '../service/token-service.js'

class postController {
    async newPost(req, res, next) {
        try{
            const {accessToken} = req.cookies
            // console.log('CONTROLLERIMG ', req)
            // const { text } = req.body
            // const { img } = req.files

            const post = await postService.newPost(accessToken, req.body.text, req.files?.img[0])

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
    
    async replyPost(req, res, next) {
        try{
            const {accessToken} = req.cookies
            const {repliedUserId, repliedPostId, text} = req.body

            const reply = await postService.replyPost(accessToken, text, repliedPostId, repliedUserId)
            res.json(reply)
        }catch(e) {
            next(e)
        }
    }
}

export default new postController