const userService = require('../service/users-service')
const imageModel = require('../models/image-model')
const ApiError = require('../exceptions/api-error')
const filterService = require('../service/filter-service')
const tokenService = require('../service/token-service')
const authorizeService = require('../service/authorize-service')

class usersController {
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

module.exports = new usersController