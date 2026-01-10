import { useState, useEffect, lazy, Suspense } from 'react'
import './index.css'
import Header from "./components/Header"
import Navbar from './components/Navbar'
import Profile from './components/ProfilePage/Profile'
import Users from './components/UsersPage/Users'
import Posts from './components/PostsPage/Posts'
import InputCode from './commonComponents/InputCode'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { loginThunk, selectIsAuth, selectIsFirstLoad, autoLoginThunk } from './store/reducers/authInfoSlice'
import { getTextThunk, selectAllText } from './store/reducers/allText'
import AuthModalWindow from './commonComponents/AuthModalWindow'
import LoadingComponent from './commonComponents/LoadingComponent'
import { useAppState, useAppDispatch } from './store/StoreConfig'
import { ConfigProvider, theme } from 'antd'
import { selectTheme } from './store/reducers/rerender'
const DialogsPage = lazy(() => import('./components/DialogsPage/DialogsPage'))
const EditProfile = lazy(() => import('./components/ProfilePage/EditProfile'))

function App() {
  const [lang, setLang] = useState(localStorage.getItem('language'))
  const isAuth: boolean = useAppState(selectIsAuth)
  const firstLoad: boolean = useAppState(selectIsFirstLoad)
  const text = useAppState(selectAllText)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const stateTheme = useAppState(selectTheme)

  useEffect(() => {
    if (!lang) dispatch(getTextThunk('en'))
    else dispatch(getTextThunk(lang))
    dispatch(autoLoginThunk())
  }, [])

  if (firstLoad || !text) {
    return <LoadingComponent />
  }
  return (
    <div className='grid grid-cols-[1fr] grid-rows-[70px_1fr_50px] md:gap-[10px]
    md:grid-cols-[130px_1fr] md:grid-rows-[70px_80vh] md:p-10
      min-w-[100vw] h-[100vh] sm:min-w-[80vw]'>
      <ConfigProvider theme={{ algorithm: stateTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
        <Header />
        <Navbar />

        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path='/profile/:id?/*' element={<Profile />} />
            <Route path='/dialogs/:id?/*' element={<DialogsPage />} />
            <Route path='/users' element={< Users />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/edit' element={<EditProfile />} />

            <Route path='/auth' element={<AuthModalWindow />} />

            <Route path='/input' element={<InputCode />} />

            <Route path='*' element={<div>404 PAGE NOT FOUND</div>} />
          </Routes>
        </Suspense>
      </ConfigProvider>
    </div>
  )
}

export default App
