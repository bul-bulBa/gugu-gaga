import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersCardThunk, setPage, selectUsers} from '../../store/reducers/usersPageSlice'
import {toggleFollow, toggleFollowingThunk, selectAuth} from '../../store/reducers/authInfoSlice'
import LoadingComponent from '../../commonComponents/LoadingComponent'
import User from './User'

function Users() {
    const state = useSelector(selectUsers)
    const authUser = useSelector(selectAuth) 
    const dispatch = useDispatch();
    const limit = 4
    const followedUsersArr = authUser.user.followed.it

    // functions
    const followToggleFunc = (id => {
        dispatch(toggleFollowingThunk(id))
    })
    const getUsersFunc = (currentPage) => {
        dispatch(setPage(currentPage))
        dispatch(getUsersCardThunk({currentPage, limit: 4}))
    }
    const allPages =  Math.ceil(state.allUsers / limit)

    useEffect(() => {
        getUsersFunc(1)
    }, []);

    
    return (
        <div>
            {state.isFetching 
            ? <LoadingComponent /> 
            : <User 
            followeUsersArr={followedUsersArr}
            users={state.users}
            allPages={allPages} 
            currentPage={state.currentPage} 
            followFunc={followToggleFunc} 
            getFunc={getUsersFunc}/>}
        </div>
    )
}

export default Users