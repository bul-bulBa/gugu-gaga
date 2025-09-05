const userModel = require('../models/user-model')
const filterService = require('./filter-service')
const tokenService = require('./token-service')
const UserDto = require('../dto/user-dto')
const UsersCardDto = require('../dto/userCard-dto')

class userService {
    async getUsers(payload) {
        if(payload.friends === 'true') {
            const result = await filterService.filterFriends(payload)

            return result.map(u => new UsersCardDto(u))
        }
        const result = await filterService.filterUsers(payload)
        const resultDto = result.map(u => new UsersCardDto(u))
        return resultDto

    }

    async getAllUsersLength() {
        const length = await userModel.countDocuments({})
        return length
    }

    async getProfile(id) {
        const user = await userModel.findOne({_id: id})
        const userDto = new UserDto(user)

        return userDto
    }
}

module.exports = new userService