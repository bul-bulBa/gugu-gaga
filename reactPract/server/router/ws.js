import { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken'
import errorMiddleware from '../middleware/error-middleware.js'
import wsService from '../service/ws-service.js'
import tokenService from '../service/token-service.js'

const initWebSocket = (server) => {
    const ws = new WebSocketServer({server})

    const clients = new Map()

        ws.on('connection', (ws, req) => {
            const cookies = req.headers.cookie
            if(!cookies) return console.log('unauthorized')
            const token = cookies
                .split('; ')
                .find(c => c.startsWith('accessToken='))
                ?.split('=')[1]
            if(!token) return console.log('unauthorized')
            const {id} = tokenService.validateAccessToken(token)
            clients.set(id, ws)
            
            ws.on('message', async (message) => {
                message = JSON.parse(message) 
                try {
                    switch(message.event) {
                    
                    case 'getMessages':
                        const {userA, userB} = message.payload
                        const messages = await wsService.getMessages(userA, userB) 
                        ws.send(JSON.stringify({ 
                            type: 'messages',
                            payload: messages
                        })) 
                    break
                    case 'getChatters': 
                        const {userId} = message.payload
                        const dialogs = await wsService.getUsers(userId)
                        ws.send(JSON.stringify({
                            type: 'chatters',
                            payload: dialogs
                        }))
                    break
                    case 'addMessage': {
                        const {writerId, readerId, text} = message.payload

                        const newMessage = await wsService.addMessage(writerId, readerId, text)
                        const changedDialog = await wsService.changeLastMessageNewText(writerId, readerId, text)
                        const res = JSON.stringify({ type: 'addMessage', payload: {message: newMessage, dialog: changedDialog} })

                        ws.send(res)
                        const received = clients.get(readerId)
                        if(received) received.send(res)
                    break
                    }
                    case 'editMessage': {
                        const {messageId, readerId, text} = message.payload
                        const obj = await wsService.editMessage(messageId, text)
                        const res = JSON.stringify({ type: 'editMessage', payload: obj})
                        ws.send(res)
                        const received = clients.get(readerId)
                        if(received) received.send(res)
                    break
                    }
                
                    case 'deleteMessage': {
                        const {messageId, writerId, readerId} = message.payload
                        const dialog = await wsService.deleteMessage(messageId, writerId, readerId)
                        const res = JSON.stringify({ type: 'deleteMessage', payload: {messageId, dialog}})
                        ws.send(res)
                        const received = clients.get(readerId)
                        if(received) received.send(res)
                        break
                    }
                    case 'makeNewDialog': {
                        const {userAId, userBId} = message.payload
                        await wsService.makeNewDialog(userAId, userBId)
                        const dialogs = await wsService.getUsers(userAId)
                        const messages = await wsService.getMessages(userAId, userBId)
                        ws.send(JSON.stringify({type: 'makeNewDialog', payload: { dialogs, messages }}))
                        break
                    }
                    case 'onRead': {
                        const {readerId, writerId} = message.payload
                        const dialog = await wsService.onRead(writerId, readerId)
                        ws.send(JSON.stringify({type: 'youReadMessage', payload: dialog}))
                        const writer = clients.get(writerId)
                        if(writer) writer.send(JSON.stringify({type: 'heReadMessage', payload: 'messages has been readed' }))
                    }
                    }
                } catch (e) {
                    console.log(e) 
                }
            })
        })

    return ws
} 

export default initWebSocket