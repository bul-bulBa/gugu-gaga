import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {stateType} from '../StoreConfig'
import {posts} from '../../api/api'

export type postType = {
    _id: string,
    text: string,
    likes: number,
    liked: boolean,
    user: {
        _id: string,
        name: string,
        avatar: string
    },
    repliedPost?: {
        text: string, 
        name: string,
        avatar: string
    }
}

export type getPostType = {
    lastId: string | undefined,
    userId: string | undefined
}

export const getPostsThunk = createAsyncThunk<postType[], getPostType>(
    'posts/getPostsThunk',
    async (params) => {
        return await posts.getPosts(params)
    }
)

export const addPostThunk = createAsyncThunk<postType, string>(
    'posts/addPostThunk',
    async (text) => {
        return await posts.addPost(text)
    }
)

export const deletePostThunk = createAsyncThunk<string, string>(
    'posts/deletePostThunk',
    async (id) => {
        await posts.deletePost(id)
        return id
    }
)

export const toggleLikeThunk = createAsyncThunk<postType, {userId: string, postId: string}>(
    'post/toggleLikeThunk',
    async (data) => {
        return await posts.toggleLike(data)
    }
)

export const replyPostThunk = createAsyncThunk<postType, {repliedPostId: string, repliedUserId: string, text: string}>(
    'posts/replyPostThunk',
    async (data) => {
        return await posts.replyPost(data)
    }
)

const addPostThunks = [addPostThunk, replyPostThunk]

const postsPageSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [] as postType[],
        lastId: undefined as string | undefined
    },
    reducers: {
        clearPosts(state) {
            state.posts = []
            state.lastId = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                console.log("PAYLOAD ", action.payload)
                state.posts = [...state.posts, ...action.payload]
                state.lastId = action.payload[action.payload.length - 1]._id
            } )
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                const index = state.posts.findIndex(p => p._id === action.payload)
                state.posts.splice(index, 1)
            })
            .addCase(toggleLikeThunk.fulfilled, (state, action) => {
                const index = state.posts.findIndex(p => p._id === action.payload._id)
                state.posts[index] = action.payload
            })
            .addMatcher(
                (action) => addPostThunks.some(t => action.type === t.fulfilled.type),
                (state, action: PayloadAction<postType>) => {
                    state.posts = [action.payload, ...state.posts]
                }
            )
    }
})

export const selectPosts = (state: stateType) => state.posts.posts
export const selectLastId = (state: stateType) => state.posts.lastId

export default postsPageSlice.reducer
export const {clearPosts} = postsPageSlice.actions