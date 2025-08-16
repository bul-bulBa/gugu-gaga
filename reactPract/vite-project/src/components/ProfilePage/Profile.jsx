import MyPosts from './UIcomponents/MyPosts';
import OnePost from "./UIcomponents/OnePost";
import ProfileDescription from "./UIcomponents/ProfileDescription";
import LoadingComponent from '../../commonComponents/LoadingComponent'
import {useSelector, useDispatch} from 'react-redux'
import {addPost, profileWillUnmount, setProfileThunk, changeStatusThunk, setItIsMe} from '../../store/reducers/profilePageSlice'
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'

function Profile() {
  // get some info
  const state = useSelector(state => state.profile.user)
  const isFetching = useSelector(state => state.profile.isFetching)
  const itIsMe = useSelector(state => state.profile.itIsMe)
  const authId = useSelector(state => state.auth)
  const dispatch = useDispatch()
  let {id} = useParams()
  const [draft, setDraft] = useState('');
  const navigate = useNavigate()
  console.log(state)

  const changeInput = (text) => setDraft(text)
  const addPosts = () => dispatch(addPost())
  const changeStatus = (text) => dispatch(changeStatusThunk(text))
  
  // ComponentDidMount/Unmount
  useEffect(() => {
    if(!id) {
        if(authId.isAuth == true) {
          dispatch(setItIsMe(true))
          dispatch(setProfileThunk(authId.user.id))
        } else {navigate('/auth')}
    } else {
      dispatch(setItIsMe(false))
      dispatch(setProfileThunk(id))
    }
    return () => {
      profileWillUnmount();
    }
  }, [id, authId.isAuth]);

  // Validation
  // let isValid = draft !== '' && draft.length <= 400;  
  
    return (
          <div className='col-start-2 row-start-2 bg-yellow-200 p-3'>
            {isFetching && <LoadingComponent/>}
            <ProfileDescription itIsMe={itIsMe} name={state.fullName} about={state.about} 
              avatar={state.avatar} profilePhoto={state.profilePhoto} status={state.status} 
              country={state.location.country} city={state.location.city} 
              changeStatus={changeStatus}/>
            {/* <MyPosts state={draft} changeInput={changeInput} addPosts={addPosts} isValid={isValid}/> */}
            <OnePost state={state.posts} />
            
          </div>
    )
}

export default Profile 