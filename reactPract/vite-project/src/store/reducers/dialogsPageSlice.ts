import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {stateType} from '../StoreConfig'

export type dialogsMessageType = {_id: string, writerId: string, readerId: string, 
    text: string, createdAt: Date, updatedAt: Date, edited: boolean, read: boolean}
export type dialogType = {
    _id: string
    participants: {userAId: string, userBId: string}, 
    participantsNames: {userAName: string, userBName: string},
    lastMessage: string,
    unread: { [userId: string]: number }}

const dialogsPageSlice = createSlice({
    name: 'dialogs',
    initialState: {
        messages: [] as dialogsMessageType[],
        dialogs: [] as dialogType[],
        chatter: {
            _id: '',
            // name: '',
            // avatar: ''
        }
     },
    reducers: {
        setMessage(state, action: PayloadAction<dialogsMessageType[]>) {
            // Merge incoming messages but preserve any `read: true` flags
            // that are already set in the client state to avoid races where
            // a later server payload (or older snapshot) resets them to false.
            const incoming = action.payload
            const existingById = new Map(state.messages.map(m => [m._id, m]))
            state.messages = incoming.map(m => {
                const existing = existingById.get(m._id)
                if (existing && existing.read) return { ...m, read: true }
                return m
            })
        },
        exitFromDialog(state) {
            state.messages = []
            state.chatter = { _id: ''}
        },
        addMessage(state, action) {
            console.log('ADDMESSAGE')
            state.messages = [...state.messages, action.payload.message]
            const index = state.dialogs.findIndex(d => d._id === action.payload.dialog._id)
            state.dialogs[index] = action.payload.dialog
        },
        removeMessage(state, action) {
            console.log(action.payload)
            const index = state.messages.findIndex(m => m._id === action.payload.messageId)
            state.messages.splice(index, 1)
            const dialogIndex = state.dialogs.findIndex(d => d._id === action.payload.dialog._id)
            state.dialogs[dialogIndex] = action.payload.dialog
        },
        setDialogs(state, action) {
            state.dialogs = action.payload
        },
        setChatter(state, action) {
            state.chatter._id = action.payload
        },
        changeMessage(state, action) {
            const messageIndex = state.messages.findIndex(m => m._id === action.payload.message._id)
            state.messages[messageIndex] = action.payload.message

            const dialogIndex = state.dialogs.findIndex(d => d._id === action.payload.dialog._id)
            state.dialogs[dialogIndex] = action.payload.dialog
        },
        updateDialog(state, action) {
            const dialog = state.dialogs.find(d => d._id === action.payload._id)
            if(dialog) Object.assign(dialog, action.payload)
        },
        updateUnreadMessages(state) {
            state.messages.forEach(m => {
                if(!m.read) {
                    m.read = true
                }
            })
            console.log('UPDATE', state.messages.map(m => m.read))
        }
    }
})

// export type dialogsStateType = ReturnType<typeof dialogsPageSlice.reducer>

export const selectDialogs = (state: stateType) => state.dialogs.messages
export const selectChatters = (state: stateType) => state.dialogs.dialogs
export const selectChatter = (state: stateType) => state.dialogs.chatter

export default dialogsPageSlice.reducer
export const {setMessage, addMessage, setDialogs, 
    setChatter, removeMessage, changeMessage, 
    updateDialog, updateUnreadMessages, exitFromDialog} = dialogsPageSlice.actions