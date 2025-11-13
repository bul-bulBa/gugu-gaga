import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {stateType} from '../StoreConfig'

type addMessageType = { id: number, message: string}
export type dialogsUserType = {_id: string, writerId: string, readerId: string, text: string }
export type chattersType = {_id: string, name: string, avatar: string}

const dialogsPageSlice = createSlice({
    name: 'dialogs',
    initialState: {
        messages: [] as dialogsUserType[],
        chatters: [] as chattersType[]
        // {id: 1, name: 'Tolik', draft: '', mes: ["tolik", 'noliktolik', 'noliksmolik']},
        // {id: 2, name: "Misha", draft: '', mes: ['misha', 'mishakrisha', 'mishamisha']},
        // {id: 3, name: 'Sergey', draft: '', mes: ['sergey', 'gey', "GAY"]},
        // {id: 4, name: "Masha", draft: '', mes: ['masha', 'pasha', 'dzhopa']},
        // {id: 5, name: "Akakiy", draft: '', mes: ['akakiy', 'kaka', 'pisya']},
        // {id: 6, name: 'Nachalnik', draft: '', mes:['dengi', 'dengi', 'Groshi']}
     },
    reducers: {
        // addMessage(state, action: PayloadAction<addMessageType>) {
        //     state.forEach(u => {
        //         if(u.id === action.payload.id) {
        //             u.mes.push(action.payload.message)
        //         }
        //     })
        // },
        // changeMessageDraft(state, action: PayloadAction<addMessageType>) {
        //     state.forEach(u => 
        //         u.id === action.payload.id ? u.draft = action.payload.message : u
        //     )
        // },
        setMessage(state, action: PayloadAction<dialogsUserType[]>) {
            state.messages = action.payload
        },
        addMessage(state, action) {
            state.messages = [...state.messages, action.payload]
        },
        setChatters(state, action) {
            console.log('asdfadsf')
            state.chatters = action.payload
        }
    }
})

// export type dialogsStateType = ReturnType<typeof dialogsPageSlice.reducer>

export const selectDialogs = (state: stateType) => state.dialogs.messages
export const selectChatters = (state: stateType) => state.dialogs.chatters

export default dialogsPageSlice.reducer
export const {setMessage, addMessage, setChatters} = dialogsPageSlice.actions