import MyPosts from './UIcomponents/MyPosts';
import ProfileDescription from "./UIcomponents/ProfileDescription";
import LoadingComponent from '../../commonComponents/LoadingComponent'
import {profileWillUnmount, setProfileThunk, 
  changeStatusThunk, setItIsMe, selectUser, 
  selectItIsMe, selectFetching, userType} from '../../store/reducers/profilePageSlice'
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {selectAuth, authInfoType} from '../../store/reducers/authInfoSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {clearPosts} from '../../store/reducers/postsPageSlice'

function Profile() {
  // get some info
  const state: userType = useAppState(selectUser)
  const isFetching: boolean = useAppState(selectFetching)
  const itIsMe: boolean = useAppState(selectItIsMe)
  const auth: authInfoType = useAppState(selectAuth)
  const dispatch = useAppDispatch() 
  let {id} = useParams()
  const [draft, setDraft] = useState<string>('');
  const navigate = useNavigate()

  const changeInput = (text: string): void => setDraft(text)
  // const addPosts = (): void => dispatch(addPost())
  const changeStatus = (text: string) => dispatch(changeStatusThunk(text))
  // const changeAvatar = (file: File) => dispatch(changeAvatarThunk(file))
  
  useEffect(() => {
    if(!id) {
        if(auth.isAuth == true) {
          dispatch(setItIsMe(true))
          dispatch(setProfileThunk(auth.user.id))
        } else {
          navigate('/auth')
        }
    } else {
      dispatch(setItIsMe(false))
      dispatch(setProfileThunk(id))
    }
    return () => {
      dispatch(profileWillUnmount())
      dispatch(clearPosts())
    }
  }, [id, auth.isAuth]);

  
    return (
          <div className='col-start-2 row-start-2 border-2 border-stone-300 rounded-xl p-3 relative'>
            {isFetching && <LoadingComponent/>}
            <ProfileDescription itIsMe={itIsMe} name={state.name} about={state.about} 
              avatar={state.avatar} profilePhoto={state.profilePhoto} status={state.status} 
              country={state.location.country} city={state.location.city} 
              changeStatus={changeStatus}/>
            <MyPosts />

            {itIsMe && <button className='absolute bottom-3 right-3' onClick={() => navigate('/edit')}>Edit</button>}
          </div>
    )
}

export default Profile 