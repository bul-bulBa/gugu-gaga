import MyPosts from './UIcomponents/MyPosts';
import OnePost from "./UIcomponents/OnePost";
import ProfileDescription from "./UIcomponents/ProfileDescription";
import LoadingComponent from '../../commonComponents/LoadingComponent'
import {profileWillUnmount, setProfileThunk, 
  changeStatusThunk, setItIsMe, selectUser, 
  selectItIsMe, selectFetching, userType} from '../../store/reducers/profilePageSlice'
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {selectAuth, authInfoType} from '../../store/reducers/authInfoSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'

function Profile() {
  // get some info
  const state: userType = useAppState(selectUser)
  const isFetching: boolean = useAppState(selectFetching)
  const itIsMe: boolean = useAppState(selectItIsMe)
  const auth: authInfoType = useAppState(selectAuth)
  const dispatch = useAppDispatch() 
  let {id: stringId} = useParams()
  const id: number | undefined = stringId ? +stringId : undefined
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
      profileWillUnmount();
    }
  }, [id, auth.isAuth]);

  
    return (
          <div className='col-start-2 row-start-2 bg-yellow-200 p-3'>
            {isFetching && <LoadingComponent/>}
            <ProfileDescription itIsMe={itIsMe} name={state.fullName} about={state.about} 
              avatar={state.avatar} profilePhoto={state.profilePhoto} status={state.status} 
              country={state.location.country} city={state.location.city} 
              changeStatus={changeStatus}/>
            {/* <MyPosts state={draft} changeInput={changeInput} addPosts={addPosts} isValid={isValid}/> */}
            <OnePost posts={state.posts} />
            
          </div>
    )
}

export default Profile 