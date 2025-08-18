import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {getUsers, changeProfile} from '../../api/api'

// start Thunks ;)
export const setProfileThunk = createAsyncThunk(
    'profile/setProfileThunk',
    async (id) => {
        return await getUsers.getProfile(id)
        // axios.get(`http://localhost:3000/profile?user=${+id}`)
        
    }
)

export const changeStatusThunk = createAsyncThunk(
    'profile/changeStatusThunk',
    async(message) => {
        return await changeProfile.changeStatus(message)
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
            },
            status: ''
        },
        isFetching: false,
        itIsMe: false
    },
    reducers: {
        // addPost(state) {
        //     state.posts.push({message: state.myPostsArrDraft, likes: 0, id: state.posts.length + 1}),
        //     state.myPostsArrDraft = ''
        // },
        // setState(state, action) {
        //     state.id = action.payload.id
        //     state.fullName = action.payload.fullName
        //     state.avatar = action.payload.avatar
        //     state.profilePhoto = action.payload.profilePhoto
        //     state.about = action.payload.about
        //     state.posts = action.payload.posts
        //     state.location = action.payload.location
        // },
        profileWillUnmount(state, action) {
            state.user.id = null
            state.user.fullName = ''
            state.user.avatar = ''
            state.user.profilePhoto = ''
            state.user.about = ''
            state.user.posts = []
            state.user.location = {city: '', country: ''}
            state.user.status = ''
        },
        setItIsMe(state, action) {
            state.itIsMe = action.payload
        }
    },
    extraReducers: (builder) => {
        // ВИКОРИСТАТИ, КОЛИ БУДУ РЕАЛІЗОВУВАТИ ЗМІНУ КОНТЕНТУ В ПРОФІЛІ
        // const handlePending = (state) => {state.isFetching = true}
        // const handleFulfilled = (state, action) => {
        //     state.user.id = action.payload.id
        //     state.user.fullName = action.payload.fullName
        //     state.user.avatar = action.payload.avatar
        //     state.user.profilePhoto = action.payload.profilePhoto
        //     state.user.about = action.payload.about
        //     state.user.posts = action.payload.posts
        //     state.user.location = action.payload.location
        //     state.user.status = action.payload.status
        //     state.isFetching = false
        // }

        // [setProfileThunk, changeStatusThunk].forEach(thunk => {
        //     builder.addCase(thunk.pending, handlePending)
        //     builder.addCase(thunk.fulfilled, handleFulfilled)
        // });
        builder 

    // set profile
        .addCase(setProfileThunk.pending, (state) => {state.isFetching = true})
        .addCase(setProfileThunk.fulfilled, (state, action) => {
            state.user.id = action.payload.id
            state.user.fullName = action.payload.fullName
            state.user.avatar = action.payload.avatar
            state.user.profilePhoto = action.payload.profilePhoto
            state.user.about = action.payload.about
            state.user.posts = action.payload.posts
            state.user.location = action.payload.location
            state.user.status = action.payload.status
            state.isFetching = false
        })
    // set status
        .addCase(changeStatusThunk.pending, (state) => {state.isFetching = true})
        .addCase(changeStatusThunk.fulfilled, (state, action) => {
            state.user.status = action.payload
            state.isFetching = false
        })
    }
})

export const selectUser = state => state.profile.user
export const selectItIsMe = state => state.profile.itIsMe
export const selectFetching  = state => state.profile.isFetching

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
export const {addPost, setState, profileWillUnmount, setItIsMe} = profilePageSlice.actions 