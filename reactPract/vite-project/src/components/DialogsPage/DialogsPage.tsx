import {useState, useEffect, useRef} from 'react'
import Dialogs from "./Dialogs"
import DialogItems from "./DialogItems"


const DialogsPage = () => {
    const socket = useRef<WebSocket>(null!)

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            socket.current.send(JSON.stringify({
                event: 'getMessages',
                payload: {
                    userA: '68ef77014617522a78005e00',
                    userB: '68ff5564b8cb9d8808983458'
                }
            }))
        }

        socket.current.onmessage = event => {
            const message = JSON.parse(event.data)
            console.log(message) 
        }
    }
    const newMessage = () => {
        const message = {
            event: 'addMessage',
            payload: {
                text: 'gugu gaga',
                writerId: '68ef77014617522a78005e00',
                readerId: '68ff5564b8cb9d8808983458'
            }
        }
        socket.current.send(JSON.stringify(message))
    }

    useEffect(() => {
        connect()
    }, [])

    return (
        <div className='flex gap-[15%] p-10'>
            <DialogItems />

            <div className='border-r-1'></div>

            <Dialogs />

            <button onClick={() => newMessage()}>Add post</button>
        </div>
    )
}

export default DialogsPage