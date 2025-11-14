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
                    const res = JSON.stringify({ type: 'addMessage', payload: newMessage })
                    ws.send(res)
                    const received = clients.get(readerId)
                    if(received) received.send(res)
                break

                case 'getChatters': 
                    const {usersId} = message.payload
                    const users = await wsService.getUsers(usersId)
                    ws.send(JSON.stringify({
                        type: 'chatters',
                        payload: users
                    }))
                break
            }
        })
    })
    return ws
} 

export default initWebSocket