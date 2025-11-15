import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {stateType} from '../StoreConfig'

const addMessageSlice = createSlice({
    name: 'addMessage',
    initialState: {
        value: '',
        editMessageId: ''
    },  
    reducers: {
        setValue(state, action) {
            state.value = action.payload
        },
        setEditMessage(state, action) {
            state.editMessageId = action.payload
        }
    }
})

export const getValue = (state: stateType) => state.addMessage.value
export const getEditMessage = (state: stateType) => state.addMessage.editMessageId

export default addMessageSlice.reducer
export const {setValue, setEditMessage} = addMessageSlice.actions 