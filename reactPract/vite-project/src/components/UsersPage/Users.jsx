import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUsers, isFetchingToggle} from '../../store/reducers/usersPageSlice'
import {toggleFollow} from '../../store/reducers/authInfoSlice'
import LoadingComponent from '../../commonComponents/LoadingComponent'
import User from './User'
import axios from 'axios'

function Users() {
    const state = useSelector(state => state.users)
    const authUser = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const limit = 4

    const followedUsersArr = authUser.user.followed.it
    
    // functions
    const followToggleFunc = (id => {
        dispatch(isFetchingToggle(true))
        axios.post('http://localhost:3000/toggleFollowing', {id, authUserId: authUser.user.id, page: state.currentPage})
        .then(data => dispatch(toggleFollow(data.data)))
        .finally(() => dispatch(isFetchingToggle(false)))
    })
    const getUsers = (currentPage) => {
        dispatch(isFetchingToggle(true))
        axios.get(`http://localhost:3000/users?page=${currentPage}&limit=${limit}`)
        .then(data => dispatch(setUsers({users: data.data.users, allUsers: data.data.allUsers, currentPage: currentPage})))
        .finally(() => dispatch(isFetchingToggle(false)))
    }
    const allPages =  Math.ceil(state.allUsers / limit)

    useEffect(() => {
        getUsers(1)
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
            getFunc={getUsers}/>}
        </div>
    )
}

export default Users