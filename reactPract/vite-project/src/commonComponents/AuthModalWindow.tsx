import {useState, useEffect} from 'react'
import Login from '../components/authPage/Login'
import SignUp from '../components/authPage/SignUp'
import InputCode from './InputCode'
import { useNavigate } from 'react-router-dom'
import {selectIsAuth} from '../store/reducers/authInfoSlice'
import {useAppState} from '../store/StoreConfig' 

function AuthModalWindow() {
    const isAuth: boolean = useAppState(selectIsAuth)
    const email: string = useAppState((state) => state.auth.email)
    const navigate = useNavigate()

    const [page, setPage] = useState<'login' | 'signUp' | 'inputCode' | undefined>()

    useEffect(() => { if(email) setPage('inputCode') }, [email])
    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])

     return (
        <div className='flex justify-center items-center'>
            
            {page === 'login' ? <Login /> : null}
            {page === 'signUp' ? <SignUp /> : null}
            {page === 'inputCode' ? <InputCode /> : null}

            {!page &&   (
                <div className='bg-gray-200 p-3 rounded'>
                    <div className='flex flex-col gap-3'>
                        <span>
                            <button onClick={() => setPage('login')}>Login</button>
                        </span>
                        <span>
                            <button onClick={() => setPage('signUp')}>Sign Up</button>
                        </span>
                    </div>
                </div>
            )}
        </div>
     )
}

export default AuthModalWindow