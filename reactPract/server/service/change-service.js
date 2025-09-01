const userModel = require('../models/user-model')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')
const ApiError = require('../exceptions/api-error')
const imageModel = require('../models/image-model')

class changeService {

    async toggleFollowing(actionId, jwt) {
        const {id} = tokenService.decrypt(jwt)

        const user = await userModel.findById(id)

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            user.followed.he.includes(actionId)
            ? { $pull: { "followed.he": actionId } }
            : { $addToSet: { "followed.he": actionId } } ,
            {new: true}
        )

        // const userDto = new UserDto(updatedUser)
        return updatedUser.followed.he
    }

    async changeStatus(text, jwt) {
        const {id} = tokenService.decrypt(jwt)

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {$set: {status: text}},
            {new: true}
        )

        return text
    }

    async changePhoto(jwt, img, name) {
        const token = tokenService.decrypt(jwt)
        const image = new imageModel({
            data: img.buffer,
            filename: img.originalname,
            contentType: img.mimetype
        })
        await image.save()

        const updatedUser = await userModel.findByIdAndUpdate(
            token.id,
            {$set: {[name]: `http://localhost:${process.env.PORT}/api/image/${image._id}`}},
            {new: true}
        )

        const userDto = new UserDto(updatedUser)
        return userDto
    }

    async changeAboutMe(jwt, text) {
        const token = tokenService.decrypt(jwt)
        const updatedUser = await userModel.findByIdAndUpdate(
            token.id,
            {$set: {about: text}},
            {new: true}
        )

        const updatedUserDto = new UserDto(updatedUser)
        return updatedUserDto
    }
}

module.exports = new changeService