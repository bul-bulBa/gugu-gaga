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
    const {userA, userB } = useGetUsers()
    const makeNewDialogId = useAppState(selectMakeNewDialog)
    const text = useAppState(selectMessages)

    useEffect(() => {
        wsService.connect({
            url: 'wss://api.gugugaga.work',

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