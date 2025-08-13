import MyPosts from './UIcomponents/MyPosts';
import OnePost from "./UIcomponents/OnePost";
import ProfileDescription from "./UIcomponents/ProfileDescription";
import LoadingComponent from '../../commonComponents/LoadingComponent'
import AuthModalWindow from '../../commonComponents/AuthModalWindow'
import {useSelector, useDispatch} from 'react-redux'
import {addPost, setState, profileWillUnmount, setStateAC} from '../../store/reducers/profilePageSlice'
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Profile() {
  // get some info
  const state = useSelector(state => state.profile)
  const authId = useSelector(state => state.auth)
  const dispatch = useDispatch()
  let {id} = useParams()
  const [draft, setDraft] = useState('');
  const navigate = useNavigate()
  const [showWindow, setShowWindow] = useState(false)
  
  // mapDispatchToProps
  const getUsers = (id) => {
    axios.get(`http://localhost:3000/profile?user=${+id}`)
    .then(data => dispatch(setState(setStateAC(data)) ) )
  }
  const changeInput = (text) => setDraft(text)
  const addPosts = () => dispatch(addPost())
  
  // ComponentDidMount/Unmount
  useEffect(() => {
    if(!id) {
      if(authId.isAuth === false) {
        navigate('/auth')
      } else {
        getUsers(authId.user.id)
      }
    } else {
      getUsers(id)
    }
    return () => {
      profileWillUnmount();
    }
  }, [id, authId]);

  // Validation
  let isValid = draft !== '' && draft.length <= 400;  
  
    return (
          <div className='col-start-2 row-start-2 bg-yellow-200 p-3'>
            
            <ProfileDescription name={state.fullName} about={state.about} avatar={state.avatar} profilePhoto={state.profilePhoto} country={state.location.country} city={state.location.city} />
            <MyPosts state={draft} changeInput={changeInput} addPosts={addPosts} isValid={isValid}/>
            <OnePost state={state.posts} />
            
          </div>
    )
}

export default Profile 