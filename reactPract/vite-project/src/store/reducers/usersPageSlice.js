import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import axios from 'axios'
import {getUsers} from '../../api/api'

// start Thunks ;)
export const getUsersCardThunk = createAsyncThunk(
    'users/getUsersCardThunk',
    async (action = {}) => {
        return await getUsers.getUsersCard(action.currentPage, action.limit)
    }
)

const usersPageSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        allUsers: 0,
        currentPage: 1,
        isFetching: false
    },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload.users,
            state.allUsers = action.payload.allUsers,
            state.currentPage = action.payload.currentPage
        },
        isFetchingToggle(state, action) {
            state.isFetching = action.payload
        },
        setPage(state, action) {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
      builder
    //   getUsersCard
        .addCase(getUsersCardThunk.pending, (state) => { state.isFetching = true })
        .addCase(getUsersCardThunk.fulfilled, (state, action) => {
            state.users = action.payload.users,
            state.allUsers = action.payload.allUsers,
            state.isFetching = false
        })
    }
})

export const selectUsers = state => state.users

export default usersPageSlice.reducer
export const {setUsers, toggleFollow, isFetchingToggle, setPage} = usersPageSlice.actions 