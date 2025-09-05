const ApiError = require('../exceptions/api-error')
const changeService = require('../service/change-service')
const {multer} = require('multer')

class changeController {
    async toggleFollowing(req, res, next) {
        try {
            const {id} = req.params
            const {token} = req.cookies

            const result = await changeService.toggleFollowing(id, token)

            res.json(result)
        } catch(e) {
            next(e)
        }
    }

    async changeStatus(req, res, next) {
        try{
            const {token} = req.cookies
            const {text} = req.body

            const result = await changeService.changeStatus(text, token)
            
            res.json(result)
        }catch(e) {
            next(e)
        }
    }

    async editProfile(req, res, next) {
        try{
            const {token} = req.cookies
            let updatedUser
            if(req.body.about) updatedUser = await changeService.changeAboutMe(token, req.body.about)
            if(req.files.avatar) updatedUser = await changeService.changePhoto(token, req.files.avatar[0], 'avatar')
            if(req.files.profilePhoto) updatedUser = await changeService.changePhoto(token, req.files.profilePhoto[0], 'profilePhoto')

            res.json({message: updatedUser})
        }catch(e) {
            next(e)
        }
    }
}

module.exports = new changeController