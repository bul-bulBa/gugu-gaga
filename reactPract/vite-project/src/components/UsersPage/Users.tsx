import {useEffect, useState} from 'react'
import {getUsersCardThunk, setPage, selectUsers, usersStateType} from '../../store/reducers/usersPageSlice'
import {toggleFollowingThunk, selectAuth, authInfoType, selectHeFollowed} from '../../store/reducers/authInfoSlice'
import LoadingComponent from '../../commonComponents/LoadingComponent'
import User from './User'
import Pagination from '../../commonComponents/pagination'
import {useAppDispatch, useAppState} from '../../store/StoreConfig'
import SearchBar from '../../commonComponents/searchBar'
import {useSearchParams } from 'react-router-dom'


const Users: React.FC = () => {
    const state: usersStateType = useAppState(selectUsers)
    const authUser: authInfoType = useAppState(selectAuth)
    const followedUsersArr: string[] = useAppState(selectHeFollowed)
    const dispatch = useAppDispatch();
    const [queryParam, setQueryParam] = useSearchParams()
    const term = queryParam.get('term')
    const friends = queryParam.get('friends')
    const limit: number = 6
    // const followedUsersArr: Array<number> = authUser.user.followed.he

    // functions
    const followToggleFunc = ((id: string): void => {
        dispatch(toggleFollowingThunk(id))
    })
    const getUsersFunc = (currentPage: number): void => {
        dispatch(setPage(currentPage))
        const heFollowed = friends ? followedUsersArr : null
        dispatch(getUsersCardThunk({currentPage, limit, term, heFollowed}))
    }
    const allPages: number =  Math.ceil(state.allUsers / limit)

    useEffect(() => { 
        getUsersFunc(1)
    }, [queryParam]);

    return (
        <div className='md:col-start-2 md:row-start-2 scroll-area'>
            {state.isFetching && <LoadingComponent/> }
            <div className='flex flex-col justify-between items-center h-full'>
                <SearchBar />

                <div>
                    {state.users.map(e => {
                    const followed: boolean = followedUsersArr.includes(e._id)
                    return (
                        <User
                        key={e._id} 
                        followFunc={followToggleFunc}
                        followed={followed}
                        user={e}/>
                    )
                })}
                </div>
            
                <Pagination Func={getUsersFunc} currentPage={state.currentPage} allPages={allPages} />
            </div>
        </div>
    )
}

export default Users