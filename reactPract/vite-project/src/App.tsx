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
      <div className='grid grid-cols-[1fr] grid-rows-[70px_80vh] gap-[10px] pb-10  md:grid-cols-[130px_1fr] md:grid-rows-[70px_80vh]'>
        <Header />
        <Navbar />
        
        <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path='/profile/:id?/*' element={<Profile/>} />
          <Route path='/dialogs/:id?/*' element={<DialogsPage />} /> 
          <Route path='/users' element={< Users />}/>
          <Route path='/posts' element={<Posts />} />
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
