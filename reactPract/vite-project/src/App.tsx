import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Header from "./components/Header"
import Navbar from './components/Navbar'
import Profile from './components/ProfilePage/Profile'
import Users from './components/UsersPage/Users'
import {useNavigate, Routes, Route} from 'react-router-dom'
import {loginThunk, selectIsAuth, selectIsFirstLoad} from './store/reducers/authInfoSlice'
import AuthModalWindow from './commonComponents/AuthModalWindow'
import LoadingComponent from './commonComponents/LoadingComponent'
import {useAppState, useAppDispatch} from './store/StoreConfig' 

const News = lazy(() => import('./components/NewsPage/News'))
const Music = lazy(() => import('./components/MusicPage/Music'))
const Setting = lazy(() => import('./components/SettingPage/Setting'))
const Dialogs = lazy(() => import('./components/DialogsPage/Dialogs'))
const DialogItems = lazy(() => import('./components/DialogsPage/DialogItems'))
const EditProfile = lazy(() => import('./components/ProfilePage/EditProfile'))

function App() {
  const isAuth: boolean = useAppState(selectIsAuth)
  const firstLoad: boolean = useAppState(selectIsFirstLoad)
  const dispatch = useAppDispatch() 
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loginThunk({}))
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

          <Route path='*' element={<div>404 PAGE NOT FOUND</div>} />
        </Routes>
        </Suspense>
        </div>
  )
}

export default App
