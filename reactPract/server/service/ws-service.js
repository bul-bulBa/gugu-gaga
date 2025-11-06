import cookie from 'cookie'
import tokenService from './token-service.js';
import ApiError from "../exceptions/api-error.js";
import messageModel from "../models/message-model.js";

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
        const message = await messageModel.create({readerId, writerId, text})
        return message
    }

    async getId(ws, req) {
        const cookies = req.headers.cookie
        if(!cookies) return ws.close()

        const parcedCookies = cookie.parse(cookies)
        const token = parcedCookies.accessToken
        if(!token) return ws.close()

        return {id} = tokenService.validateAccessToken(token)
    }
}

export default new wsService 