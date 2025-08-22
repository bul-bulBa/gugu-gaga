import { useState, useEffect, lazy, Suspense } from 'react'
import {useSelector} from 'react-redux'
import './App.css'
import Header from "./components/Header"
import Navbar from './components/Navbar'
import Profile from './components/ProfilePage/Profile'
import Users from './components/UsersPage/Users'
import {useNavigate, Routes, Route} from 'react-router-dom'
import {loginThunk, selectIsAuth, selectIsFirstLoad} from './store/reducers/authInfoSlice'
import {useDispatch} from 'react-redux'
import AuthModalWindow from './commonComponents/AuthModalWindow'
import LoadingComponent from './commonComponents/LoadingComponent'

const News = lazy(() => import('./components/NewsPage/News'))
const Music = lazy(() => import('./components/MusicPage/Music'))
const Setting = lazy(() => import('./components/SettingPage/Setting'))
const Dialogs = lazy(() => import('./components/DialogsPage/Dialogs'))
const DialogItems = lazy(() => import('./components/DialogsPage/DialogItems'))
const EditProfile = lazy(() => import('./components/ProfilePage/EditProfile'))

function App(props) {
  const isAuth = useSelector(selectIsAuth)
  const firstLoad = useSelector(selectIsFirstLoad)
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loginThunk())
  }, [])

  if(firstLoad) {
    return <LoadingComponent />
  }
  return (
      <div className='grid grid-cols-[130px_1fr] grid-rows-[70px_minmax(80vh,_auto)] w-[1200px] gap-[10px]'>
        <Header />
        <Navbar />
        
        <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path='/profile/:id?/*' element={<Profile/>} />
          <Route path='/dialogs/*' element={<DialogItems />} > 
            <Route path=':id/*' element={<Dialogs/>} />
          </Route>
          <Route path='/users' element={< Users />}/>
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/edit' element={<EditProfile />} />

          <Route path='/auth' element={<AuthModalWindow/>}/>
        </Routes>
        </Suspense>
        </div>
  )
}

export default App
