import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getUsers, changeProfile, posts} from '../../api/api'
import {stateType} from '../StoreConfig'
import { postType, getPostType } from './postsPageSlice'

// EDIT PROFILE TYPE
    export type editProfileType = {avatar: File | null, profilePhoto: File | null, about: string}

// STATE TYPE (only user)  
    export type userType = {
            id: string,
            name: string,
            avatar: string,
            profilePhoto: string,
            about: string,
            location: {
                city: string,
                country: string
            },
            status: string
    }

// start Thunks ;)
export const setProfileThunk = createAsyncThunk(
    'profile/setProfileThunk',
    async (id: string): Promise<userType> => {
        return await getUsers.getProfile(id)
    }
)

export const changeStatusThunk = createAsyncThunk(
    'profile/changeStatusThunk',
    async(message: string): Promise<string> => {
        return await changeProfile.changeStatus(message)
    }
)

export const editThunk = createAsyncThunk(
    'profile/editThunk',
    async(value: editProfileType): Promise<void> => {
        return await changeProfile.edit(value)
    }
)


// start Slice :>
const profilePageSlice = createSlice({
    name: 'profile',
    initialState: {
        user: {
            id: '',
            name: '',
            avatar: '',
            profilePhoto: '',
            about: '',
            location: {
                city: '',
                country: ''
            },
            status: ''
        } as userType,
        isFetching: false,
        itIsMe: false,
        posts: [] as postType[],
        lastId: undefined as string | undefined
    },
    reducers: {
        profileWillUnmount(state) {
            state.user = {
                id: '',
                name: '',
                avatar: '',
                profilePhoto: '',
                about: '',
                location: {
                    city: '',
                    country: ''
                },
                status: ''
            }
            state.posts = [],
            state.lastId = undefined
        },
        setItIsMe(state, action) {
            state.itIsMe = action.payload
        }
    },
    extraReducers: (builder) => {
        builder 

    // set profile
        .addCase(setProfileThunk.pending, (state) => {state.isFetching = true})
        .addCase(setProfileThunk.fulfilled, (state, action) => {
            state.user = action.payload
            state.isFetching = false
        })
    // set status
        .addCase(changeStatusThunk.pending, (state) => {state.isFetching = true})
        .addCase(changeStatusThunk.fulfilled, (state, action) => {
            state.user.status = action.payload
            state.isFetching = false
        })
    // edit profile
        .addCase(editThunk.pending, (state) => {state.isFetching = true})
        .addCase(editThunk.fulfilled, (state) => {
            state.isFetching = false
        })
    }
})

export type profileStateType = ReturnType<typeof profilePageSlice.reducer>

export const selectUser = (state: stateType) => state.profile.user
export const selectItIsMe = (state: stateType) => state.profile.itIsMe
export const selectFetching  = (state: stateType) => state.profile.isFetching
export const selectPosts = (state: stateType) => state.profile.posts
export const selectLastId = (state: stateType) => state.profile.lastId

export default profilePageSlice.reducer
export const {profileWillUnmount, setItIsMe} = profilePageSlice.actions 