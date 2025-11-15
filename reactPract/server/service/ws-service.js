import cookie from 'cookie'
import tokenService from './token-service.js';
import ApiError from "../exceptions/api-error.js";
import messageModel from "../models/message-model.js";
import userModel from '../models/user-model.js';
import ChatterDto from '../dto/chatter-dto.js';

let wsServer = null

class wsService {
    async setServer(server) {
        wsServer = server
    }

    async getMessages(user1, user2) {
        return await messageModel.find({
            $or: [
                { writerId: user1, readerId: user2},
                { writerId: user2, readerId: user1}
            ]
        })
    }

    async addMessage(writerId, readerId, text) {
        const message = await messageModel.create({readerId, writerId, text, edited: false})
        return message
    }

    async getUsers(usersId) {
        let users = await userModel.find({ _id: { $in: usersId}})

        const usersDto = users.map(u => new ChatterDto(u))
        return usersDto 
    }

    async editMessage(messageId, newText) { 
        const message = await messageModel.findByIdAndUpdate( messageId, { $set: { text: newText, edited: true}}, { new: true} )
        return message
    }

    async deleteMessage(messageId) {
        await messageModel.findByIdAndDelete(messageId)
    }

    // async getId(ws, req) {
    //     const cookies = req.headers.cookie
    //     if(!cookies) return ws.close() 

    //     const parcedCookies = cookie.parse(cookies)
    //     const token = parcedCookies.accessToken
    //     if(!token) return ws.close()

    //     return {id} = tokenService.validateAccessToken(token)
    // }
}

export default new wsService 