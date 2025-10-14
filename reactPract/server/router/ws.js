const WebSocketServer = require('ws')

const initWebSocket = (server) => {
    const wss = new WebSocketServer({server})

    wss.on('connection', function() {
        console.log('client connected')
    })
} 

module.exports = initWebSocket