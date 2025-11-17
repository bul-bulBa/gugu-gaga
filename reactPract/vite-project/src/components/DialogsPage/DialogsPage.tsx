import {useState, useEffect, useRef} from 'react'
import { useAppDispatch, useAppState } from '../../store/StoreConfig'
import {selectAuthId, selectHeFollowed} from '../../store/reducers/authInfoSlice'
import {setMessage, addMessage, setDialogs, setChatter, 
    selectChatter, removeMessage, changeMessage,
    updateDialog, updateUnreadMessages } from '../../store/reducers/dialogsPageSlice'
import Dialogs from "./Dialogs"
import DialogItems from "./DialogItems"

// export let isConnected: boolean
export let getMessages: any
export let newMessage: any
export let editMessage: any
export let deleteMessage: any
export let onRead: any
const DialogsPage = () => {
    const dispatch = useAppDispatch()
    const socket = useRef<WebSocket>(null!)
    const userA = useAppState(selectAuthId)
    const {_id: userB} = useAppState(selectChatter)
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
            if(message.type === 'chatters') dispatch(setDialogs(message.payload))
            if(message.type === 'deleteMessage') dispatch(removeMessage(message.payload))
            if(message.type === 'editMessage') dispatch(changeMessage(message.payload))
            if(message.type === 'heReadMessage') dispatch(updateUnreadMessages())
            if(message.type === 'youReadMessage') {
                dispatch(updateDialog(message.payload))
                dispatch(updateUnreadMessages())
            }
            // console.log(message.payload)
        }
    }
    getMessages = (userBclickedId: string) => {
        dispatch(setChatter(userBclickedId))
        const message = {
            event: 'getMessages',
            payload: {
                userA,
                userB: userBclickedId
            }
        }
        socket.current.send(JSON.stringify(message))
    }

    const getUsers = () => {
        socket.current.send(JSON.stringify({
            event: 'getChatters',
            payload: {
                userId: userA
            }
        }))
    }

    newMessage = (text: string) => {
        const message = {
            event: 'addMessage',
            payload: {
                text,
                writerId: userA,
                readerId: userB
            }
        }
        socket.current.send(JSON.stringify(message))
    }

    editMessage = (messageId: string, text: string) => {
        const message = {
            event: 'editMessage',
            payload: {
                messageId,
                text,
                readerId: userB
            }
        }
        socket.current.send(JSON.stringify(message))
    }

    deleteMessage = (messageId: string) => {
        const message = {
            event: 'deleteMessage',
            payload: {
                messageId,
                readerId: userB,
                writerId: userA
            }
        }
        socket.current.send(JSON.stringify(message))
    }

    onRead = () => {
        socket.current.send(JSON.stringify({
            event: 'onRead',
            payload: {
                readerId: userA,
                writerId: userB
            }
        }))
    }

    const addNewDialog = (userBId: string) => {
        socket.current.send(JSON.stringify({
            event: 'makeNewDialog',
            payload: {  userAId: userA, userBId }
        }))
    }

    useEffect(() => {
        connect()
    }, [])

    return (
        <div className='flex gap-[5%] p-10'>
            <DialogItems />

            <div className='border-r-1'></div>

            <Dialogs />

            {/* <button onClick={() => addNewDialog('68ff5564b8cb9d8808983458')}>.</button> */}
        </div>
    )
}

export default DialogsPage