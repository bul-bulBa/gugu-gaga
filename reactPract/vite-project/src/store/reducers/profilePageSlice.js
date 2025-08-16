import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {getUsers} from '../../api/api'

// start Thunks ;)
export const setProfileThunk = createAsyncThunk(
    'profile/setProfileThunk',
    async (id) => {
        return await getUsers.getProfile(id)
        // axios.get(`http://localhost:3000/profile?user=${+id}`)
        
    }
)

// start Slice :>
const profilePageSlice = createSlice({
    name: 'profile',
    initialState: {
        user: {
            id: null,
            fullName: '',
            avatar: '',
            profilePhoto: '',
            about: '',
            posts: [],
            location: {
                city: '',
                country: ''
            }
        },
        isFetching: false
    },
    reducers: {
        addPost(state) {
            state.posts.push({message: state.myPostsArrDraft, likes: 0, id: state.posts.length + 1}),
            state.myPostsArrDraft = ''
        },
        setState(state, action) {
            state.id = action.payload.id
            state.fullName = action.payload.fullName
            state.avatar = action.payload.avatar
            state.profilePhoto = action.payload.profilePhoto
            state.about = action.payload.about
            state.posts = action.payload.posts
            state.location = action.payload.location
        },
        profileWillUnmount(state, action) {
            state.id = null
            state.fullName = ''
            state.avatar = ''
            state.profilePhoto = ''
            state.about = ''
            state.posts = []
            state.location = {city: '', country: ''}
        }
    },
    extraReducers: (builder) => {
      builder
        // setProfile
        .addCase(setProfileThunk.pending, (state) => {state.isFetching = true})
        .addCase(setProfileThunk.fulfilled, (state, action) => {
            state.user.id = action.payload.id
            state.user.fullName = action.payload.fullName
            state.user.avatar = action.payload.avatar
            state.user.profilePhoto = action.payload.profilePhoto
            state.user.about = action.payload.about
            state.user.posts = action.payload.posts
            state.user.location = action.payload.location
            state.isFetching = false
        })
    }
})

export const setStateAC = (data) => ({
    id: data.id,
    fullName: data.fullName, 
    avatar: data.avatar, 
    profilePhoto: data.profilePhoto, 
    about: data.about, 
    posts: data.posts,
    location: data.location
})

export default profilePageSlice.reducer
export const {addPost, setState, profileWillUnmount} = profilePageSlice.actions 