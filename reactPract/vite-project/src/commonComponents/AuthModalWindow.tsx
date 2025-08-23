import {useState, useEffect} from 'react'
import Login from '../components/authPage/Login'
import SignUp from '../components/authPage/SignUp'
import { useNavigate } from 'react-router-dom'
import {selectIsAuth} from '../store/reducers/authInfoSlice'
import {useAppState} from '../store/StoreConfig'

function AuthModalWindow() {
    const isAuth: boolean = useAppState(selectIsAuth)
    const navigate = useNavigate()
    const [login, setLogin] = useState<boolean>(false) 
    const [signIn, setSignIn] = useState<boolean>(false)

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth]) 

     return (
        <div className='flex justify-center items-center'>
            {login && <Login />}
            {signIn && <SignUp />}

            {!login && !signIn &&  (
                <div className='bg-gray-200 p-3 rounded'>
                    <div className='flex flex-col gap-3'>
                        <span>
                            <button onClick={() => setLogin(true)}>Login</button>
                        </span>
                        <span>
                            <button onClick={() => setSignIn(true)}>Sign In</button>
                        </span>
                    </div>
                </div>
            )}
        </div>
     )
}

export default AuthModalWindow