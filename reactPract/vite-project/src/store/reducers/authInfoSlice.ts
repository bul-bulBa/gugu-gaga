import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {authorize, getUsers} from '../../api/api'
import {stateType} from '../StoreConfig'

// LOGIN THUNK TYPES
    type followedType = {it: Array<number>, they: Array<number>}
    export type actionLoginType = {name?: string, password?: string, captcha?: string}
// SIGNUP THUNK TYPES
    export type actionSingUpType = {name: string, password: string, country: string, city: string, captcha: string}
// STATE TYPE
    export type stateUserType = { id: number, avatar: string,followed: followedType}

// start Thunks :)
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (action: actionLoginType ) => {
        const res: stateUserType = await authorize.login({
            name: action.name ?? '', 
            password: action.password ?? '', 
            captcha: action.captcha ?? ''})
        return res
    }
)

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    () => {
        authorize.logout()
    }
)

export const signUpThunk = createAsyncThunk(
    'auth/signUpThunk',
    async ({name, password, country, city, captcha}: actionSingUpType) => {
        const res: stateUserType = await authorize.signUp({name, password, country, city, captcha})
        return res
    }
)

export const toggleFollowingThunk = createAsyncThunk(
    'auth/toggleFollowingThunk',
    async (id: number) => {
        const res: Array<number> = await getUsers.toggleFollowing(id)
        return res
    }
)

// start Slice ;>
const authInfoSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {} as stateUserType,
        isAuth: false,
        isFetching: true,
        error: null as string | null | undefined,
        firstLoad: true 
    },
    reducers: {
        setProfile(state, action) {
            state.user = action.payload
            state.isAuth = true;
        },
        toggleFollow(state, action) {
            // state.user.followed.it = action.payload

            // console.log(state.user.followed.it);
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
      builder
        // login
        .addCase(loginThunk.pending, (state) => { state.isFetching = true })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.isFetching = false
            state.error= null
            state.user = action.payload
            state.isAuth = true
            state.firstLoad = false
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.isFetching = false
            state.firstLoad = false
            if (action.error.message === 'Request failed with status code 401') {
                state.error = 'Неправильне ім`я або пароль'
            } else if(action.error.message === 'Request failed with status code 500') {
                state.error  = null
            }
        })

        // logout
        .addCase(logoutThunk.pending, (state) => {
        state.user = {id: 0, avatar: '', followed: {it:[], they:[]}},
        state.isAuth = false,
        state.isFetching = false,
        state.error = null
        })

        // signUp
        .addCase(signUpThunk.pending, (state) => { state.isFetching = true })
        .addCase(signUpThunk.fulfilled, (state, action) => {
            state.isFetching = false
            state.user = action.payload
            state.error = null
            state.isAuth = true
        })
        .addCase(signUpThunk.rejected, (state, action) => {
            state.isFetching = false
            if (action.error.message === 'Request failed with status code 409') {
                state.error = "Користувач з таким ім'ям вже існує"
            } else {
                state.error = action.error.message
            }
        })

        // toggleFollowing
        .addCase(toggleFollowingThunk.pending, (state) => {
            state.isFetching = true
            state.error = null
        })
        .addCase(toggleFollowingThunk.fulfilled, (state, action) => {
            state.isFetching = false
            if (state.user?.followed) {
                state.user.followed.it = action.payload
            }
        })
        .addCase(toggleFollowingThunk.rejected, (state, action) => {
            state.isFetching = false
            state.error = action.error.message
        })
    }
})

export type authInfoType = ReturnType<typeof authInfoSlice.reducer>

export const selectIsAuth = (state: stateType) => state.auth.isAuth
export const selectIsFirstLoad = (state: stateType) => state.auth.firstLoad
export const selectAuthId = (state: stateType) => state.auth.user?.id ?? null
export const selectError = (state: stateType) => state.auth.error
export const selectAuth = (state: stateType) => state.auth

// export const setProfileAC = (data) => ({id: data.data.id, avatar: data.data.avatar, followed: data.data.followed})

export default authInfoSlice.reducer
export const {setProfile, toggleFollow, setError} = authInfoSlice.actions 