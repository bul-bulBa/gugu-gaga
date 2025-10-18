import userService from '../service/users-service.js'
import imageModel from '../models/image-model.js'
import ApiError from '../exceptions/api-error.js'
import filterService from '../service/filter-service.js'
import tokenService from '../service/token-service.js'
import authorizeService from '../service/authorize-service.js'

class UsersController {
    async getUsers(req, res, next) {
        try{
            const {page, limit, term, friends} = req.query
            const {token} = req.cookies

            // гавнокод
            const user = await authorizeService.autoLogin(token)
            const heFollowed = user.followed.he

            const result = await userService.getUsers({page, limit, term, friends, heFollowed: heFollowed})
            const allUsers = await userService.getAllUsersLength() // працює коректно тільки якщо немає фільтрації(тре переробити)

            res.json({users: result, allUsers: allUsers})
        }catch(e) {
            next(e)
        }
    }

    async getProfile(req, res, next) {
        try{
            const {id} = req.params
            const {token} = req.cookies
            const userId = id
            if(!id) user = tokenService.decrypt(token)
            
            const user = await userService.getProfile(userId)

            res.json(user)
        }catch(e) {
            next(e)
        }
    }

    async getImage(req, res, next) {
        try{
            const img = await imageModel.findById(req.params.id)
            if(!img) throw new ApiError.BadRequest('image is not defined')

            res.contentType('image/png')    
            res.send(img.data)
        }catch(e) {
            next(e)
        }
    }

    async autoComplete(req, res, next) {
        try{
            const filteredNames = await filterService.autoComplete(req.params.user)
            res.json(filteredNames)
        }catch(e) {
            next(e)
        }
    }
}

export default new UsersController