import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateType } from "../StoreConfig";
import { language } from '../../api/api'

export const getTextThunk = createAsyncThunk<any, string>(
    'getText',
    (lang) => {
        return language.getText(lang)
    }
)

const allText = createSlice({
    name: 'allText',
    initialState: {
        texts: {}
    } as any,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTextThunk.fulfilled, (state, action) => {
                state.texts = action.payload
                console.log(state.texts)
            })
    }
})

export const selectAllText = (state: stateType) => state.text.texts

export default allText.reducer
export const {} = allText.actions 