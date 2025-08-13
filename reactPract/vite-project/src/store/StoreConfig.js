import {configureStore, combineReducers} from '@reduxjs/toolkit'
import dialogsPageReducer from './reducers/dialogsPageSlice'
import profilePageReducer from './reducers/profilePageSlice'
import usersPageReducer from './reducers/usersPageSlice'
import authInfoReducer from './reducers/authInfoSlice'

const rootReducer = combineReducers({
    dialogs: dialogsPageReducer,
    profile: profilePageReducer,
    users: usersPageReducer,
    auth: authInfoReducer,
})

const store = configureStore({ reducer:rootReducer })

export default store