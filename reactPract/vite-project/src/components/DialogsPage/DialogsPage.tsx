import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppState } from '../../store/StoreConfig'
import { selectAuthId, selectHeFollowed } from '../../store/reducers/authInfoSlice'
import {
    setMessage, addMessage, setDialogs, setChatter,
    selectChatter, removeMessage, changeMessage,
    updateDialog, updateUnreadMessages, selectMakeNewDialog,
    makeNewDialog,
} from '../../store/reducers/dialogsPageSlice'
import { selectMessages } from '../../store/reducers/allText'
import Dialogs from "./Dialogs"
import DialogItems from "./DialogItems"
import { wsService } from '../../api/wsService'
import { apiWS } from '../../api/apiWS'
import { useGetUsers } from '../../lib/useGetUsers'


const DialogsPage = () => {
    const dispatch = useAppDispatch()
    // const socket = useRef<WebSocket>(null!)
    const {userA, userB } = useGetUsers()
    const makeNewDialogId = useAppState(selectMakeNewDialog)
    const text = useAppState(selectMessages)

    // function connect() {
    //     socket.current = new WebSocket('ws://localhost:5000')

    //     socket.current.onopen = () => {
    //         if(makeNewDialogId) {
    //                 socket.current.send(JSON.stringify({
    //                 event: 'makeNewDialog',
    //                 payload: {  userAId: userA, userBId: makeNewDialogId }
    //             }))
    //         return
    //         }

    //         getUsers()
    //     }

    //     socket.current.onmessage = event => {
    //         const message = JSON.parse(event.data)
    //         if(message.type === 'messages') dispatch(setMessage(message.payload))
    //         if(message.type === 'addMessage') dispatch(addMessage(message.payload))
    //         if(message.type === 'chatters') dispatch(setDialogs(message.payload))
    //         if(message.type === 'deleteMessage') dispatch(removeMessage(message.payload))
    //         if(message.type === 'editMessage') dispatch(changeMessage(message.payload))
    //         if(message.type === 'heReadMessage') dispatch(updateUnreadMessages())
    //         if(message.type === 'youReadMessage') {
    //             dispatch(updateDialog(message.payload))
    //             dispatch(updateUnreadMessages())
    //         }
    //         if(message.type === 'makeNewDialog') dispatch(makeNewDialog(message.payload))
    //     }
    // }
    // getMessages = (userBclickedId: string) => {
    //     dispatch(setChatter(userBclickedId))
    //     const message = {
    //         event: 'getMessages',
    //         payload: {
    //             userA,
    //             userB: userBclickedId
    //         }
    //     }
    //     socket.current.send(JSON.stringify(message))
    // }

    // const getUsers = () => {
    //     socket.current.send(JSON.stringify({
    //         event: 'getChatters',
    //         payload: {
    //             userId: userA
    //         }
    //     }))
    // }

    // newMessage = (text: string) => {
    //     const message = {
    //         event: 'addMessage',
    //         payload: {
    //             text,
    //             writerId: userA,
    //             readerId: userB
    //         }
    //     }
    //     socket.current.send(JSON.stringify(message))
    // }

    // editMessage = (messageId: string, text: string) => {
    //     const message = {
    //         event: 'editMessage',
    //         payload: {
    //             messageId,
    //             text,
    //             readerId: userB
    //         }
    //     }
    //     socket.current.send(JSON.stringify(message))
    // }

    // deleteMessage = (messageId: string) => {
    //     const message = {
    //         event: 'deleteMessage',
    //         payload: {
    //             messageId,
    //             readerId: userB,
    //             writerId: userA
    //         }
    //     }
    //     socket.current.send(JSON.stringify(message))
    // }

    // onRead = () => {
    //     socket.current.send(JSON.stringify({
    //         event: 'onRead',
    //         payload: {
    //             readerId: userA,
    //             writerId: userB
    //         }
    //     }))
    // }

    useEffect(() => {
        wsService.connect({
            url: 'ws://localhost:5000',

            onOpen: () => {
                if (makeNewDialogId) {
                    apiWS.makeNewDialog(userA, makeNewDialogId)
                    return
                }

                apiWS.getUsers(userA)
            },

            onMessage: (message) => {
                if (message.type === 'messages') dispatch(setMessage(message.payload))
                if (message.type === 'addMessage') dispatch(addMessage(message.payload))
                if (message.type === 'chatters') dispatch(setDialogs(message.payload))
                if (message.type === 'deleteMessage') dispatch(removeMessage(message.payload))
                if (message.type === 'editMessage') dispatch(changeMessage(message.payload))
                if (message.type === 'heReadMessage') dispatch(updateUnreadMessages())
                if (message.type === 'youReadMessage') {
                    dispatch(updateDialog(message.payload))
                    dispatch(updateUnreadMessages())
                }
                if (message.type === 'makeNewDialog') dispatch(makeNewDialog(message.payload))
            }
        })
    }, [])


    return (
        <div className='sm:p-10 h-full min-h-0'>
            {!userB && <div className='text-lg'>{text.newDialog}</div>}
            {!userB && <DialogItems />}

            <Dialogs />
        </div>
    )
}

export default DialogsPage