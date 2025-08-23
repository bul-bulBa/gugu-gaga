import {configureStore, combineReducers} from '@reduxjs/toolkit'
import dialogsPageReducer from './reducers/dialogsPageSlice'
import profilePageReducer from './reducers/profilePageSlice'
import usersPageReducer from './reducers/usersPageSlice'
import authInfoReducer from './reducers/authInfoSlice'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({
    dialogs: dialogsPageReducer,
    profile: profilePageReducer,
    users: usersPageReducer,
    auth: authInfoReducer,
})
export type stateType = ReturnType<typeof rootReducer>
export const useAppState: TypedUseSelectorHook<stateType> = useSelector

const store = configureStore({ reducer:rootReducer })
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
// import {useAppState, useAppDispatch} from '../store/StoreConfig' 