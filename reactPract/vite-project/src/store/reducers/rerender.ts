import { createSlice } from "@reduxjs/toolkit";
import { stateType } from "../StoreConfig";

const rerender = createSlice({
    name: 'rerender',
    initialState: { 
        theme: ''
    },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload
        }
    }
    
})

export const selectTheme = (state: stateType) => state.rerender.theme

export default rerender.reducer
export const { setTheme } = rerender.actions 