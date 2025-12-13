import { createSlice } from "@reduxjs/toolkit";
import { stateType } from "../StoreConfig";
import { colorThemes } from '../../commonComponents/colorTheme'

type ColorTheme = typeof colorThemes[number];

const rerender = createSlice({
    name: 'rerender',
    initialState: { 
        theme: '' as 'dark' | 'light' | '', 
        colorTheme: '' as ColorTheme
    },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload
        },
        setColorTheme(state, action) {
            state.colorTheme = action.payload
        }
    }
    
})

export const selectTheme = (state: stateType) => state.rerender.theme
export const selectColorThemes = (state: stateType) => state.rerender.colorTheme

export default rerender.reducer
export const { setTheme, setColorTheme } = rerender.actions 