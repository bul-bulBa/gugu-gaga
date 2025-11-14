import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {stateType} from '../StoreConfig'

type addMessageType = { id: number, message: string}
export type dialogsUserType = {_id: string, writerId: string, readerId: string, text: string }
export type chattersType = {_id: string, name: string, avatar: string}

const dialogsPageSlice = createSlice({
    name: 'dialogs',
    initialState: {
        messages: [] as dialogsUserType[],
        chatters: [] as chattersType[],
        chatter: {
            _id: '',
            name: '',
            avatar: ''
        }
     },
    reducers: {
        setMessage(state, action: PayloadAction<dialogsUserType[]>) {
            state.messages = action.payload
        },
        addMessage(state, action) {
            state.messages = [...state.messages, action.payload]
        },
        setChatters(state, action) {
            state.chatters = action.payload
        },
        setChatter(state, action) {
            state.chatter = action.payload
        }
    }
})

// export type dialogsStateType = ReturnType<typeof dialogsPageSlice.reducer>

export const selectDialogs = (state: stateType) => state.dialogs.messages
export const selectChatters = (state: stateType) => state.dialogs.chatters
export const selectChatter = (state: stateType) => state.dialogs.chatter

export default dialogsPageSlice.reducer
export const {setMessage, addMessage, setChatters, setChatter} = dialogsPageSlice.actions