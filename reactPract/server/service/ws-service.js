import cookie from 'cookie'
import tokenService from './token-service.js';
import ApiError from "../exceptions/api-error.js";
import messageModel from "../models/message-model.js";
import userModel from '../models/user-model.js';
import ChatterDto from '../dto/chatter-dto.js';
import dialogModel from '../models/dialog-model.js';

let wsServer = null

class wsService {
    async setServer(server) {
        wsServer = server
    }

    async makeNewDialog(userAId, userBId) {
        const userA = await userModel.findById(userAId)
        const userB = await userModel.findById(userBId)

        await dialogModel.create(
            {participants: {userAId, userBId}, 
            participantsNames: {userAName: userA.name, userBName: userB.name}}) 
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

    async changeLastMessage(writerId, readerId, text) {
        const dialog = await dialogModel.findOne({
            $or: [
                {"participants.userAId": writerId, "participants.userBId": readerId},
                {"participants.userAId": readerId, "participants.userBId": writerId}
            ]
        })
        if(dialog) {
            dialog.lastMessage = text
            dialog.unread.set(readerId, 1)
            await dialog.save()
        }

        return dialog
    }

    async onRead(writerId, readerId) {

        // messages in frontend change read state without state of updated messages in db
        await messageModel.updateMany( { writerId, readerId, read: false },
          { $set: { read: true } } )

        const dialog = await dialogModel.findOneAndUpdate(
          {
            $or: [
              { "participants.userAId": writerId, "participants.userBId": readerId },
              { "participants.userAId": readerId, "participants.userBId": writerId }
            ]
          },
          { $unset: { [`uread.${readerId}`]: "" } },
          { new: true }
        )
        console.log('DIALOG ', dialog)
        return dialog
    }

    async getUsers(userId) {
        return await dialogModel.find({
            $or: [
                { "participants.userAId": userId},
                { "participants.userBId": userId} 
            ]
        })
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