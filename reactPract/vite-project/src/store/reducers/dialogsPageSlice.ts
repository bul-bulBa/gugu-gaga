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
            state.messages = action.payload
        },
        addMessage(state, action) {
            state.messages = [...state.messages, action.payload.message]
            const index = state.dialogs.findIndex(d => d._id === action.payload.dialog._id)
            state.dialogs[index] = action.payload.dialog
        },
        removeMessage(state, action) {
            console.log(action.payload)
            const index = state.messages.findIndex(m => m._id === action.payload)
            state.messages.splice(index, 1)
        },
        setDialogs(state, action) {
            state.dialogs = action.payload
        },
        setChatter(state, action) {
            state.chatter = action.payload
        },
        changeMessage(state, action) {
            const message = state.messages.find(m => m._id === action.payload._id)
            if(message) Object.assign(message, action.payload)
        },
        updateDialog(state, action) {
            console.log(action.payload)
            const dialog = state.dialogs.find(d => d._id === action.payload._id)
            if(dialog) Object.assign(dialog, action.payload)
        },
        updateUnreadMessages(state) {
            state.messages.forEach(m => {
                if(!m.read) {
                    m.read = true
                }
            })
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
    updateDialog, updateUnreadMessages} = dialogsPageSlice.actions