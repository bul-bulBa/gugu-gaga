import MyPosts from './UIcomponents/MyPosts';
import OnePost from "./UIcomponents/OnePost";
import ProfileDescription from "./UIcomponents/ProfileDescription";
import LoadingComponent from '../../commonComponents/LoadingComponent'
import {useSelector, useDispatch} from 'react-redux'
import {profileWillUnmount, setProfileThunk, 
  changeStatusThunk, setItIsMe, selectUser, 
  selectItIsMe, selectFetching} from '../../store/reducers/profilePageSlice'
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {selectAuth} from '../../store/reducers/authInfoSlice'

function Profile() {
  // get some info
  const state = useSelector(selectUser)
  const isFetching = useSelector(selectFetching)
  const itIsMe = useSelector(selectItIsMe)
  const auth = useSelector(selectAuth)
  const dispatch = useDispatch() 
  let {id} = useParams()
  const [draft, setDraft] = useState('');
  const navigate = useNavigate()
  console.log(state)

  const changeInput = (text) => setDraft(text)
  const addPosts = () => dispatch(addPost())
  const changeStatus = (text) => dispatch(changeStatusThunk(text))
  const changeAvatar = file => dispatch(changeAvatarThunk(file))
  
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
              changeStatus={changeStatus} changeAvatar={changeAvatar}/>
            {/* <MyPosts state={draft} changeInput={changeInput} addPosts={addPosts} isValid={isValid}/> */}
            <OnePost state={state.posts} />
            
          </div>
    )
}

export default Profile 