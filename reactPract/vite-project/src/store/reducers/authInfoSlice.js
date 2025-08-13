import {createSlice} from '@reduxjs/toolkit'

const authInfoSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            id: null,
            avatar: '',
            followed: {
                it: [],
                they: []
            }
        },
        isAuth: false
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
            
        }
    }
})

export const setProfileAC = (data) => ({id: data.data.id, avatar: data.data.avatar, followed: data.data.followed})

export default authInfoSlice.reducer
export const {setProfile, toggleFollow} = authInfoSlice.actions 