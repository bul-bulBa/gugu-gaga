import userModel from '../models/user-model.js'
import filterService from './filter-service.js'
import tokenService from './token-service.js'
import UserDto from '../dto/user-dto.js'
import UsersCardDto from '../dto/userCard-dto.js'

class UserService {
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

export default new UserService