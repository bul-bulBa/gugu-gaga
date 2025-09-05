import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit'
import {getUsers} from '../../api/api'
import {stateType} from '../StoreConfig'

// STATE TYPES
    export type userType = {
      id: number,
      name: string,
      about: string,
      avatar: string,
      location: {country: string, city: string}
    }
    type usersType = Array<userType>
    export type autoComplType = {name: string, _id: string}
// GET USERS THUNK TYPE
    export type getUsersType = {currentPage: number, limit: number, term: string | null, friends: string | null}
    export type resultUsersType = {users: usersType, allUsers: number}

// start Thunks ;)
export const getUsersCardThunk = createAsyncThunk(
    'users/getUsersCardThunk',
    async ({currentPage, limit, term, friends}: getUsersType): Promise<resultUsersType> => {
        return await getUsers.getUsersCard({currentPage, limit, term, friends})
    }
) 

export const getAutoCompNamesThunk = createAsyncThunk(
    'users/getAutoCompNamesThunk',
    async (value: string): Promise<autoComplType[]> => {
        return await getUsers.getAutoCompNames(value)
    }
)

const usersPageSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as usersType,
        usersAutocomplete: [] as string[],
        allUsers: 0,
        currentPage: 1,
        isFetching: false
    },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload.users
            state.allUsers = action.payload.allUsers
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
            state.users = action.payload.users
            state.allUsers = action.payload.allUsers
            state.usersAutocomplete = []
            state.isFetching = false
        })

    // getAutoCompNames
        .addCase(getAutoCompNamesThunk.fulfilled, (state, action) => {
            console.log("ACTIONPAYLOAD ", action.payload)
            state.usersAutocomplete = action.payload.map(u => u.name)
        })
    }
})

export type usersStateType = ReturnType<typeof usersPageSlice.reducer>

export const selectUsers = (state: stateType) => state.users
export const selectAutoCompUsers = (state: stateType) => state.users.usersAutocomplete
// export const memoSelectAutoCompNames = createSelector(
//     [selectAutoCompUsers],
//     (users) => {
//         const arr: string[] = []
//         usersAutocomplete.map(u => arr.push(u.name))
//         return arr
//     }
// )

export default usersPageSlice.reducer
export const {setUsers, isFetchingToggle, setPage} = usersPageSlice.actions 