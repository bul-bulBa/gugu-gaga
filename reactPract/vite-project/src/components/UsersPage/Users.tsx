import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersCardThunk, setPage, selectUsers, usersStateType} from '../../store/reducers/usersPageSlice'
import {toggleFollow, toggleFollowingThunk, selectAuth, authInfoType} from '../../store/reducers/authInfoSlice'
import LoadingComponent from '../../commonComponents/LoadingComponent'
import User from './User'
import Pagination from '../../commonComponents/pagination'
import {useAppDispatch, useAppState} from '../../store/StoreConfig'

const Users: React.FC = () => {
    const state: usersStateType = useAppState(selectUsers)
    const authUser: authInfoType = useAppState(selectAuth) 
    const dispatch = useAppDispatch();
    const limit: number = 4
    const followedUsersArr: Array<number> = authUser.user.followed.it

    // functions
    const followToggleFunc = ((id: number): void => {
        dispatch(toggleFollowingThunk(id))
    })
    const getUsersFunc = (currentPage: number): void => {
        dispatch(setPage(currentPage))
        dispatch(getUsersCardThunk({currentPage, limit: 4}))
    }
    const allPages: number =  Math.ceil(state.allUsers / limit)

    useEffect(() => { 
        getUsersFunc(1)
    }, []);

    return (
        <div >
            {state.isFetching 
            ? <LoadingComponent /> 
            : (

                <div className='flex flex-col justify-between items-center h-full'>
                    <div>
                        {state.users.map(e => {
                        const followed: boolean = followedUsersArr.includes(e.id)
                        return (
                            <User
                            key={e.id} 
                            followFunc={followToggleFunc}
                            followed={followed}
                            user={e}/>
                        )
                    })}
                    </div>
                
                    <Pagination Func={getUsersFunc} currentPage={state.currentPage} allPages={allPages} />
                </div>

            )}
            
            
        </div>
    )
}

export default Users