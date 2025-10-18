import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router/index.js'
import cookieParcer from 'cookie-parser'
import errorMiddleware from './middleware/error-middleware.js'
import initWebSocket from './router/ws.js'
import http from 'http'


const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParcer())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))
app.use('/api', router)
app.use(errorMiddleware)

// const server = http.createServer(app)
// const wss = initWebSocket(server)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        app.listen(PORT, () => console.log(`server started on: http://localhost:${PORT}`))
    } catch(e) {
        console.log("SERVER ERROR", e, " END SERVER ERROR")
    }
}

start()