import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {authorize, getUsers} from '../../api/api'
import {stateType} from '../StoreConfig'

// LOGIN THUNK TYPES
    type followedType = {he: Array<number>, onHim: Array<number>}
    export type actionLoginType = {email?: string, password?: string, captcha?: string}
// SIGNUP THUNK TYPES
    export type actionSignUpType = {email: string,name: string, password: string, country: string, city: string, captcha: string}
// STATE TYPE
    export type stateUserType = {avatar: string,followed: followedType, id: string}

// start Thunks :)
export const loginThunk = createAsyncThunk<stateUserType, actionLoginType>(
    'auth/loginThunk',
    async (action: actionLoginType ): Promise<stateUserType> => {
        return await authorize.login({
            email: action.email ?? '', 
            password: action.password ?? '', 
            captcha: action.captcha ?? ''})
    }
)

export const autoLoginThunk = createAsyncThunk(
    'auth, autoLoginThunk',
    async (): Promise<stateUserType> => {
        return await authorize.autoLogin()
    }
)

export const logoutThunk = createAsyncThunk<void, void>(
    'auth/logout',
    (): void => {
        authorize.logout()
    }
)

export const signUpThunk = createAsyncThunk<stateUserType, actionSignUpType>(
    'auth/signUpThunk',
    async ({email, name, password, country, city, captcha}: actionSignUpType): Promise<stateUserType> => {
        return await authorize.signUp({email, name, password, country, city, captcha})
    }
)

export const deleteThunk = createAsyncThunk(
    'auth/deleteThunk',
    (): void => {
        authorize.delete()
    }
)

export const toggleFollowingThunk = createAsyncThunk<number[], number>(
    'auth/toggleFollowingThunk',
    async (id: number): Promise<Array<number>> => {
        return await getUsers.toggleFollowing(id)
    }
)

// start Slice ;>
const authInfoSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            avatar: '',
            followed: {
                he: [],
                onHim: []
            },
            id: ''
        } as stateUserType,
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

        // autoLogin
        .addCase(autoLoginThunk.pending, (state) => {state.isFetching = true})
        .addCase(autoLoginThunk.fulfilled, (state, action) => {
            state.isFetching = false
            state.error= null
            state.user = action.payload
            state.isAuth = true
            state.firstLoad = false
        })
        .addCase(autoLoginThunk.rejected, (state) => {
            state.isFetching = false
            state.error= null
            state.firstLoad = false
        })

        // logout
        .addCase(logoutThunk.pending, (state) => {
        state.user = {id: '', avatar: '', followed: {he:[], onHim:[]}},
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

        // delete
        .addCase(deleteThunk.pending, (state) => {
            state.user = {id: '', avatar: '', followed: {he:[], onHim:[]}},
            state.isAuth = false,
            state.isFetching = false,
            state.error = null
        })

        // toggleFollowing
        .addCase(toggleFollowingThunk.pending, (state) => {
            state.isFetching = true
            state.error = null
        })
        .addCase(toggleFollowingThunk.fulfilled, (state, action) => {
            state.isFetching = false
            if (state.user?.followed) {
                state.user.followed.he = action.payload
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

export default authInfoSlice.reducer
export const {setProfile, setError} = authInfoSlice.actions 