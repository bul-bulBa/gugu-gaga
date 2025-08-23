import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getUsers} from '../../api/api'
import {stateType} from '../StoreConfig'

// STATE TYPES
    export type userType = {
      id: number,
      fullName: string,
      about: string,
      avatar: string,
      location: {country: string, city: string}
    }
    type usersType = Array<userType>
// GET USERS THUNK TYPE
    export type getUsersType = {currentPage: number, limit: number}
    export type resultUsersType = {users: usersType, allUsers: number}

// start Thunks ;)
export const getUsersCardThunk = createAsyncThunk(
    'users/getUsersCardThunk',
    async ({currentPage, limit}: getUsersType) => {
        const res: resultUsersType = await getUsers.getUsersCard({currentPage, limit})
        return res
    }
) 

const usersPageSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as usersType,
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
        setPage(state, action: {payload: number}) {
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

export type usersStateType = ReturnType<typeof usersPageSlice.reducer>

export const selectUsers = (state: stateType) => state.users

export default usersPageSlice.reducer
export const {setUsers, isFetchingToggle, setPage} = usersPageSlice.actions 