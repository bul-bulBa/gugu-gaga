import ApiError from '../exceptions/api-error.js'
import postService from '../service/post-service.js'

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

            const posts = await postService.getPosts(lastId, userId)

            res.json(posts)
        }catch(e) {
            next(e)
        }
    }
    async getUserPosts(req, res, next) {
        try{
            const {accessToken} = req.cookies
            const {id} = req.query

            const posts = await postService.getUserPosts(accessToken, id)
            
            res.json(posts)
        }catch(e) {
            next(e)
        } 
    }
}

export default new postController