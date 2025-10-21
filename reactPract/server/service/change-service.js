import userModel from '../models/user-model.js'
import tokenService from './token-service.js'
import UserDto from '../dto/user-dto.js'
import ApiError from '../exceptions/api-error.js'
import imageModel from '../models/image-model.js'

class ChangeService {

    async toggleFollowing(actionId, jwt) {
        const {id} = tokenService.validateAccessToken(jwt)

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
        const {id} = tokenService.validateAccessToken(jwt)

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {$set: {status: text}},
            {new: true}
        )

        return text
    }

    async changePhoto(jwt, img, name) {
        const token = tokenService.validateAccessToken(jwt)
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
        const token = tokenService.validateAccessToken(jwt)
        const updatedUser = await userModel.findByIdAndUpdate(
            token.id,
            {$set: {about: text}},
            {new: true}
        )

        const updatedUserDto = new UserDto(updatedUser)
        return updatedUserDto
    }
}

export default new ChangeService