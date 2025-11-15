import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {stateType} from '../StoreConfig'

export type dialogsMessageType = {_id: string, writerId: string, readerId: string, 
    text: string, createdAt: Date, updatedAt: Date, edited: boolean}
export type chattersType = {_id: string, name: string, avatar: string}

const dialogsPageSlice = createSlice({
    name: 'dialogs',
    initialState: {
        messages: [] as dialogsMessageType[],
        chatters: [] as chattersType[],
        chatter: {
            _id: '',
            name: '',
            avatar: ''
        }
     },
    reducers: {
        setMessage(state, action: PayloadAction<dialogsMessageType[]>) {
            state.messages = action.payload
        },
        addMessage(state, action) {
            state.messages = [...state.messages, action.payload]
        },
        removeMessage(state, action) {
            console.log(action.payload)
            const index = state.messages.findIndex(m => m._id === action.payload)
            state.messages.splice(index, 1)
        },
        setChatters(state, action) {
            state.chatters = action.payload
        },
        setChatter(state, action) {
            state.chatter = action.payload
        },
        changeMessage(state, action) {
            const message = state.messages.find(m => m._id === action.payload._id)
            if(message) Object.assign(message, action.payload)
        }
    }
})

// export type dialogsStateType = ReturnType<typeof dialogsPageSlice.reducer>

export const selectDialogs = (state: stateType) => state.dialogs.messages
export const selectChatters = (state: stateType) => state.dialogs.chatters
export const selectChatter = (state: stateType) => state.dialogs.chatter

export default dialogsPageSlice.reducer
export const {setMessage, addMessage, setChatters, setChatter, removeMessage, changeMessage} = dialogsPageSlice.actions