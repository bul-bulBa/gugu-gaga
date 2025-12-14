import {configureStore, combineReducers} from '@reduxjs/toolkit'
import dialogsPageReducer from './reducers/dialogsPageSlice'
import profilePageReducer from './reducers/profilePageSlice'
import usersPageReducer from './reducers/usersPageSlice'
import authInfoReducer from './reducers/authInfoSlice'
import postsPageReducer from './reducers/postsPageSlice'
import addMessageReducer from './reducers/addMessageSlice'
import rerender from './reducers/rerender'
import allTextReducer from './reducers/allText'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({
    dialogs: dialogsPageReducer,
    profile: profilePageReducer,
    users: usersPageReducer,
    auth: authInfoReducer,
    posts: postsPageReducer,
    addMessage: addMessageReducer,
    rerender,
    text: allTextReducer
})
export type stateType = ReturnType<typeof rootReducer>
export const useAppState: TypedUseSelectorHook<stateType> = useSelector

const store = configureStore({ reducer:rootReducer })
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
// import {useAppState, useAppDispatch} from '../store/StoreConfig' 