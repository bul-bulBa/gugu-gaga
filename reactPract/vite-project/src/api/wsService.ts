
interface wsServiceType {
    url: string,
    onOpen: () => void,
    onMessage: (msg: any) => void,
}

class WSService {
    private socket: WebSocket | null = null

    connect({url, onMessage, onOpen}: wsServiceType) {

        this.socket = new WebSocket(url)

        this.socket.onopen = () => {
            onOpen()
        }

        this.socket.onmessage = event => {
            const message = JSON.parse(event.data)
            onMessage(message)
        }
    }

    send(event: string, payload: any) {
        if(!this.socket) return
        this.socket.send(JSON.stringify({event, payload}))
    }
}

export const wsService = new WSService()