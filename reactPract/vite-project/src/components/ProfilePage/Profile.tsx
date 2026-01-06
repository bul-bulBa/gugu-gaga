import { MessageOutlined } from '@ant-design/icons'
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
import { setNewDialogId } from '../../store/reducers/dialogsPageSlice'
import { selectProfile } from '../../store/reducers/allText'; 

function Profile() {
  const text = useAppState(selectProfile)
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
  const makeNewDialogFunc = () => {
    dispatch(setNewDialogId(id))
    navigate('/dialogs')
  }
  
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
          <div className='md:col-start-2 md:row-start-2 p-3 relative'>
            {isFetching && <LoadingComponent/>}
            <ProfileDescription itIsMe={itIsMe} name={state.name} about={state.about} 
              avatar={state.avatar} profilePhoto={state.profilePhoto} status={state.status} 
              country={state.location.country} city={state.location.city} 
              changeStatus={changeStatus}/>
            <MyPosts />

            {itIsMe && <button className='sticky bottom-20 sm:bottom-5 ' onClick={() => navigate('/edit')}>{text.edit}</button>}
            {!itIsMe && <button onClick={makeNewDialogFunc} className='sticky bottom-10'><MessageOutlined /></button>}
          </div>
    )
}

export default Profile 