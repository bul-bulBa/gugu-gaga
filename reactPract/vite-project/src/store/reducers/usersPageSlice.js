import {createSlice} from '@reduxjs/toolkit'

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
        }
    }
})

export default usersPageSlice.reducer
export const {setUsers, toggleFollow, isFetchingToggle} = usersPageSlice.actions 