import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/Header"
import Navbar from './components/Navbar'
import Profile from './components/ProfilePage/Profile'
import Dialogs from './components/DialogsPage/Dialogs'
import Users from './components/UsersPage/Users'
import News from './components/NewsPage/News'
import Music from './components/MusicPage/Music'
import Setting from './components/SettingPage/Setting'
import {useNavigate, Routes, Route} from 'react-router-dom'
import DialogItems from './components/DialogsPage/DialogItems'
import authRecuest from './commonComponents/authRequest'
import {useDispatch} from 'react-redux'
import AuthModalWindow from './commonComponents/AuthModalWindow'

function App(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    authRecuest(undefined, undefined, dispatch, navigate);
  }, [])

  return (
      <div className='grid grid-cols-[130px_1fr] grid-rows-[70px_minmax(80vh,_auto)] w-[1200px] gap-[10px]'>
        <Header />
        <Navbar />

        <Routes>
          <Route path='/profile/:id?/*' element={<Profile/>} />
          <Route path='/dialogs/*' element={<DialogItems />} > 
            <Route path=':id/*' element={<Dialogs/>} />
          </Route>
          <Route path='/users' element={< Users />}/>
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/setting' element={<Setting />} />

          <Route path='/auth' element={<AuthModalWindow/>}/>
        </Routes>
      
        </div>
  )
}

export default App
