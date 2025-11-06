import { WebSocketServer } from 'ws'
import wsService from '../service/ws-service.js'

const initWebSocket = (server) => {
    const ws = new WebSocketServer({server})

    ws.on('connection', (ws) => {
        ws.on('message', async (message) => {
            message = JSON.parse(message)

            switch(message.event) {
                
                case 'getMessages':
                    const {userA, userB} = message.payload
                    const messages = await wsService.getMessages(userA, userB) 
                    ws.send(JSON.stringify({ 
                        type: 'messages',
                        payload: messages
                    }))
                break

                case 'addMessage':
                    const {writerId, readerId, text} = message.payload
                    const newMessage = await wsService.addMessage(writerId, readerId, text)
                    ws.send(JSON.stringify({
                        type: 'message',
                        payload: newMessage
                    }))
                break
            }
        })
    })
    return ws
} 

export default initWebSocket