import {useState, useEffect, useRef} from 'react'
import { useAppDispatch, useAppState } from '../../store/StoreConfig'
import {selectAuthId, selectHeFollowed} from '../../store/reducers/authInfoSlice'
import {setMessage, addMessage, setChatters, setChatter, selectChatter } from '../../store/reducers/dialogsPageSlice'
import Dialogs from "./Dialogs"
import DialogItems from "./DialogItems"

export let getMessages: any
export let newMessage: any
const DialogsPage = () => {
    const dispatch = useAppDispatch()
    const socket = useRef<WebSocket>(null!)
    const userA = useAppState(selectAuthId)
    const userB = useAppState(selectChatter)
    const heFollowed = useAppState(selectHeFollowed)

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            getUsers()
        }

        socket.current.onmessage = event => {
            const message = JSON.parse(event.data)
            if(message.type === 'messages') dispatch(setMessage(message.payload))
            if(message.type === 'addMessage') dispatch(addMessage(message.payload))
            if(message.type === 'chatters') dispatch(setChatters(message.payload))
            console.log(message) 
        }
    }
    getMessages = (userBclicked: any) => {
        dispatch(setChatter(userBclicked))
        const message = {
            event: 'getMessages',
            payload: {
                userA,
                userB: userBclicked._id
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

    newMessage = (text: string) => {
        const message = {
            event: 'addMessage',
            payload: {
                text,
                writerId: userA,
                readerId: userB._id
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
        </div>
    )
}


export default DialogsPage