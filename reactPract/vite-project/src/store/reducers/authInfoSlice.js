import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authorize, getUsers} from '../../api/api'

// start Thunks :)
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (action = {}) => {
        const res = await authorize.login(action.name, action.password, action.captcha)
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
    async ({name, password, country, city, captcha}) => {
        const res = await authorize.signUp(name, password, country, city, captcha)
        return res
    }
)

export const toggleFollowingThunk = createAsyncThunk(
    'auth/toggleFollowingThunk',
    async (id) => {
        const res = await getUsers.toggleFollowing(id)
        return res
    }
)

// start Slice ;>
const authInfoSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            avatar: '',
            followed: {
                it: [],
                they: []
            },
            id: null,
        },
        isAuth: false,
        isFetching: true,
        error: null,
        firstLoad: true
    },
    reducers: {
        setProfile(state, action) {
            state.user.id = action.payload.id
            state.user.avatar = action.payload.avatar
            state.user.followed = action.payload.followed
            state.isAuth = true;
        },
        toggleFollow(state, action) {
            state.user.followed.it = action.payload

            console.log(state.user.followed.it);
            
        },
        setError(state, action) {
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
        state.user = {
            avatar: '',
            followed: {
                it: [],
                they: []
            },
            id: null,
        },
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

export const selectIsAuth = state => state.auth.isAuth
export const selectIsFirstLoad = state => state.auth.firstLoad
export const selectAuthId = state => state.auth.user.id
export const selectError = state => state.auth.error
export const selectAuth = state => state.auth

export const setProfileAC = (data) => ({id: data.data.id, avatar: data.data.avatar, followed: data.data.followed})

export default authInfoSlice.reducer
export const {setProfile, toggleFollow, setError} = authInfoSlice.actions 