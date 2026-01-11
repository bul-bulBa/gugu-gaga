import { wsService } from './wsService'


export const apiWS = {
    getUsers: (userA: string) => {
        wsService.send('getChatters', { userId: userA })
    },
    getMessages: (userA: string, userB: string) => {
        wsService.send('getMessages', { userA, userB })
    },
    newMessage: (text: string, userA: string, userB: string) => {
        console.log('NEWMESSEGE', text, userA, userB)
        wsService.send('addMessage', { text, writerId: userA, readerId: userB })
    },
    editMessage: (messageId: string, text: string, userB: string) => {
        wsService.send('editMessage', { messageId, text, readerId: userB })
    },
    deleteMessage: (messageId: string, userA: string, userB: string) => {
        wsService.send('deleteMessage', { messageId, readerId: userB, writerId: userA })
    },
    onRead: (userA: string, userB: string) => {
        wsService.send('onRead', { readerId: userA, writerId: userB })
    },
    makeNewDialog: (userAId: string, userBId: string) => {
        wsService.send('makeNewDialog', { userAId, userBId })
    }
}