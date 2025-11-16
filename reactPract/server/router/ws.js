import { WebSocketServer } from 'ws'
import wsService from '../service/ws-service.js'
import tokenService from '../service/token-service.js'

const initWebSocket = (server) => {
    const ws = new WebSocketServer({server})

    const clients = new Map()

    ws.on('connection', (ws, req) => {
        const cookies = req.headers.cookie
        const token = cookies
            .split('; ')
            .find(c => c.startsWith('accessToken='))
            ?.split('=')[1]
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
                    const changedDialog = await wsService.changeLastMessage(writerId, readerId, text)
                    const res = JSON.stringify({ type: 'addMessage', payload: {message: newMessage, dialog: changedDialog} })
                    ws.send(res)
                    const received = clients.get(readerId)
                    if(received) received.send(res)
                break
                }

                case 'editMessage': {
                    const {messageId, readerId, text} = message.payload
                    const editedMessage = await wsService.editMessage(messageId, text)
                    const res = JSON.stringify({ type: 'editMessage', payload: editedMessage})
                    ws.send(res)
                    const received = clients.get(readerId)
                    if(received) received.send(res)
                break
                }

                case 'deleteMessage': {
                    const {messageId, readerId} = message.payload
                    await wsService.deleteMessage(messageId)
                    const res = JSON.stringify({ type: 'deleteMessage', payload: messageId})
                    ws.send(res)
                    const received = clients.get(readerId)
                    if(received) received.send(res)
                    break
                }

                case 'makeNewDialog': {
                    const {userAId, userBId} = message.payload
                    await wsService.makeNewDialog(userAId, userBId)
                    ws.send(JSON.stringify('new dialog was maked'))
                    break
                }

                case 'onRead': {
                    const {readerId, writerId} = message.payload

                    const dialog = await wsService.onRead(writerId, readerId)
                    console.log('RESPONSE ', dialog)
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