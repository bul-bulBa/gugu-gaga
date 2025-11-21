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

        let dialog = await dialogModel.findOne({
            $or: [
                {"participants.userAId": userAId, "participants.userBId": userBId},
                {"participants.userAId": userBId, "participants.userBId": userAId}
            ]
        })

        if(!dialog) {
            dialog = await dialogModel.create(
            {participants: {userAId, userBId}, 
            participantsNames: {userAName: userA.name, userBName: userB.name}}) 
        }
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
            const current = dialog.unread.get(readerId)
            dialog.unread.set(readerId, current + 1)
            console.log('UNREAD ', current)
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
          { $set: { [`unread.${readerId}`]: 0 } },
          { new: true }
        )
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

        const dialog = await this.changeLastMessage(message.writerId, message.readerId)
        return {message, dialog}
    }

    async deleteMessage(messageId, writerId, readerId) {

        await messageModel.findByIdAndDelete(messageId)

        const dialog = await this.changeLastMessage(writerId, readerId)
        return dialog
    }

    async changeLastMessage(writerId, readerId) {
        let lastMessage = await messageModel.findOne({ 
            $or: [
                {writerId, readerId},
                {readerId: writerId, writerId: readerId}
            ]
         }, {}, { sort: { _id: -1} })
        if(!lastMessage) lastMessage = {text: ''}
        
        const dialog = await dialogModel.findOneAndUpdate({
            $or: [
              { "participants.userAId": writerId, "participants.userBId": readerId },
              { "participants.userAId": readerId, "participants.userBId": writerId }
            ]
        }, { $set: { lastMessage: lastMessage.text}}, { new: true})

        return dialog
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