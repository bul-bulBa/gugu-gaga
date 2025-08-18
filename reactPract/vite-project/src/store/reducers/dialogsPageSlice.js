import {createSlice} from '@reduxjs/toolkit'

const dialogsPageSlice = createSlice({
    name: 'dialogs',
    initialState: [
        {id: 1, name: 'Tolik', draft: '', mes: ["tolik", 'noliktolik', 'noliksmolik']},
        {id: 2, name: "Misha", draft: '', mes: ['misha', 'mishakrisha', 'mishamisha']},
        {id: 3, name: 'Sergey', draft: '', mes: ['sergey', 'gey', "GAY"]},
        {id: 4, name: "Masha", draft: '', mes: ['masha', 'pasha', 'dzhopa']},
        {id: 5, name: "Akakiy", draft: '', mes: ['akakiy', 'kaka', 'pisya']},
        {id: 6, name: 'Nachalnik', draft: '', mes:['dengi', 'dengi', 'Groshi']}
    ],
    reducers: {
        addMessage(state, action) {
            state.forEach(u => {
                if(u.id === action.payload.id) {
                    u.mes.push(action.payload.message)
                }
            })
        },
        changeMessageDraft(state, action) {
            state.forEach(u => 
                u.id === action.payload.id ? u.draft = action.payload.message : u
            )
        }
    }
})

export const selectDialogs = state => state.dialogs

export default dialogsPageSlice.reducer
export const {addMessage, changeMessageDraft} = dialogsPageSlice.actions