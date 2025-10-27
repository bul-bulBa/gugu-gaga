import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Header from "./components/Header"
import Navbar from './components/Navbar'
import Profile from './components/ProfilePage/Profile'
import Users from './components/UsersPage/Users'
import Posts from './components/PostsPage/Posts'
import InputCode from './commonComponents/InputCode'
import {useNavigate, Routes, Route} from 'react-router-dom'
import {loginThunk, selectIsAuth, selectIsFirstLoad, autoLoginThunk} from './store/reducers/authInfoSlice'
import AuthModalWindow from './commonComponents/AuthModalWindow'
import LoadingComponent from './commonComponents/LoadingComponent'
import {useAppState, useAppDispatch} from './store/StoreConfig' 

const News = lazy(() => import('./components/NewsPage/News'))
const Setting = lazy(() => import('./components/SettingPage/Setting'))
const DialogsPage = lazy(() => import('./components/DialogsPage/DialogsPage'))
const EditProfile = lazy(() => import('./components/ProfilePage/EditProfile'))

function App() {
  const isAuth: boolean = useAppState(selectIsAuth)
  const firstLoad: boolean = useAppState(selectIsFirstLoad)
  const dispatch = useAppDispatch() 
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(autoLoginThunk())
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
          <Route path='/dialogs/:id?/*' element={<DialogsPage />} /> 
          <Route path='/users' element={< Users />}/>
          <Route path='/posts' element={<Posts />} />
          <Route path='/news' element={<News />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/edit' element={<EditProfile />} />

          <Route path='/auth' element={<AuthModalWindow/>}/>

          <Route path='/input' element={<InputCode />} />

          <Route path='*' element={<div>404 PAGE NOT FOUND</div>} />
        </Routes>
        </Suspense>
        </div>
  )
}

export default App
