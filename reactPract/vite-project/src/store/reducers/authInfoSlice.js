import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authorize, getUsers} from '../../api/api'

// start Thunks :)
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (action = {}) => {
        const res = await authorize.login(action.name, action.password)
        // axios.post('http://localhost:3000/login', {
        //     name: action.name, 
        //     password: action.password
        // }, {withCredentials: true})
        // if(res.response) throw new Error(res.respoonse.status)
        return res
    }
)

export const signUpThunk = createAsyncThunk(
    'auth/signUpThunk',
    async ({name, password, country, city}) => {
        const res = await authorize.signUp(name, password, country, city)
        // axios.post('http://localhost:3000/profile', {
            // name, 
            // password, 
            // location: {country, city}
        // }, {withCredentials: true})
        //  throw new Error(err.response.status)
        return res
    }
)

export const toggleFollowingThunk = createAsyncThunk(
    'auth/toggleFollowingThunk',
    async (action) => {
        const res = await getUsers.toggleFollowing(action.id, action.authUserId,  action.page)
        // axios.post('http://localhost:3000/toggleFollowing', {authUserId: action.authUserId, id: action.id, page: action.page})
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
        isFetching: false,
        error: null
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
        .addCase(loginThunk.pending, (state) => {
            state.isFetching = true
            state.error = null
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.isFetching = false
            state.user = action.payload
            state.isAuth = true
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.isFetching = false
            if (action.payload?.status === 401) {
                state.error = 401
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

        // signUp
        .addCase(signUpThunk.pending, (state) => {
            state.isFetching = true
            state.error = null
        })
        .addCase(signUpThunk.fulfilled, (state, action) => {
            state.isFetching = false
            state.user = action.payload
            state.isAuth = true
        })
        .addCase(signUpThunk.rejected, (state, action) => {
            state.isFetching = false
            if (action.payload?.status === 409) {
                state.error = "Користувач з таким ім'ям вже існує"
            } else {
                state.error = action.error.message
            }
        })
    }
})

export const setProfileAC = (data) => ({id: data.data.id, avatar: data.data.avatar, followed: data.data.followed})

export default authInfoSlice.reducer
export const {setProfile, toggleFollow, setError} = authInfoSlice.actions 