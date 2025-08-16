import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUsers, isFetchingToggle, getUsersCardThunk} from '../../store/reducers/usersPageSlice'
import {toggleFollow, toggleFollowingThunk} from '../../store/reducers/authInfoSlice'
import LoadingComponent from '../../commonComponents/LoadingComponent'
import User from './User'
import {getUsers} from '../../api/api'

function Users() {
    const state = useSelector(state => state.users)
    const authUser = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const limit = 4

    const followedUsersArr = authUser.user.followed.it

    // functions
    const followToggleFunc = (id => {
        dispatch(toggleFollowingThunk({authUserId: authUser.user.id, id, page: state.currentPage}))
    })
    const getUsersFunc = (currentPage) => {
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