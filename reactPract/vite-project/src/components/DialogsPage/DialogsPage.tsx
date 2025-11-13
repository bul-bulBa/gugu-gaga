import {useState, useEffect, useRef} from 'react'
import { useAppDispatch, useAppState } from '../../store/StoreConfig'
import {selectAuthId, selectHeFollowed} from '../../store/reducers/authInfoSlice'
import {setMessage, addMessage, setChatters } from '../../store/reducers/dialogsPageSlice'
import Dialogs from "./Dialogs"
import DialogItems from "./DialogItems"

export let getMessages: any
const DialogsPage = () => {
    const dispatch = useAppDispatch()
    const socket = useRef<WebSocket>(null!)
    const userA = useAppState(selectAuthId)
    const heFollowed = useAppState(selectHeFollowed)

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            getUsers()
            // getMessages('68ff5564b8cb9d8808983458')
        }

        socket.current.onmessage = event => {
            const message = JSON.parse(event.data)
            if(message.type === 'messages') dispatch(setMessage(message.payload))
            if(message.type === 'addMessage') dispatch(addMessage(message.payload))
            if(message.type === 'chatters') dispatch(setChatters(message.payload))
            console.log(message) 
        }
    }
    getMessages = (userB: string) => {
        const message = {
            event: 'getMessages',
            payload: {
                userA,
                userB
            }
        }
        socket.current.send(JSON.stringify(message))
    }

    const getUsers = () => {
        socket.current.send(JSON.stringify({
            event: 'getChatters',
            payload: {
                usersId: heFollowed
            }
        }))
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