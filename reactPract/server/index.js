import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router/index.js'
import cookieParcer from 'cookie-parser'
import errorMiddleware from './middleware/error-middleware.js'
import initWebSocket from './router/ws.js'
import http from 'http'
import { createClient } from 'redis';
import wsService from './service/ws-service.js'

// export const client = createClient({ url: 'redis://127.0.0.1:6379' });
export const client = createClient({ url: process.env.REDIS_URL})

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParcer())
app.use(cors({
    origin: 'https://bul-bulba.github.io/',
    credentials: true
}))
app.use('/api', router)
app.use(errorMiddleware)

const server = http.createServer(app)
const ws = initWebSocket(server)
wsService.setServer(ws)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        server.listen(PORT, () => console.log(`server started on: http://localhost:${PORT}`))
    } catch(e) {
        console.log("SERVER ERROR", e, " END SERVER ERROR")
    }
}

start()