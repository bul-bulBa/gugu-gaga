import {createSlice} from '@reduxjs/toolkit'

const profilePageSlice = createSlice({
    name: 'profile',
    initialState: {
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
    }
})

export const setStateAC = (data) => ({
    id: data.data.id,
    fullName: data.data.fullName, 
    avatar: data.data.avatar, 
    profilePhoto: data.data.profilePhoto, 
    about: data.data.about, 
    posts: data.data.posts,
    location: data.data.location
})

export default profilePageSlice.reducer
export const {addPost, setState, profileWillUnmount} = profilePageSlice.actions 