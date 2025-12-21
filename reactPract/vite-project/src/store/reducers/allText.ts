import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stateType } from "../StoreConfig";
import { language } from '../../api/api'
import allTextType from "../../types/allTextTypes";

export const getTextThunk = createAsyncThunk<any, string>(
    'getText',
    (lang) => {
        return language.getText(lang)
    }
)

const allText = createSlice({
    name: 'allText',
    initialState: {
        texts: {} as allTextType
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

export const selectHeader = (state: stateType) => state.text.texts.header
export const selectNavigation = (state: stateType) => state.text.texts.navigation
export const selectAuthorization = (state: stateType) => state.text.texts.authorization
export const selectProfile = (state: stateType) => state.text.texts.profile
export const selectPosts = (state: stateType) => state.text.texts.posts
export const selectUsers = (state: stateType) => state.text.texts.users
export const selectMessages = (state: stateType) => state.text.texts.messages

export default allText.reducer
export const {} = allText.actions 