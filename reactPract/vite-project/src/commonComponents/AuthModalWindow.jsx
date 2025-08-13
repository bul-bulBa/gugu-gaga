import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import Login from '../components/authPage/login/Login'
import SignIn from '../components/authPage/signIn/SignIn'

function AuthModalWindow() {
    const navigate = useNavigate()

    const [login, setLogin] = useState(false) 
    const [signIn, setSignIn] = useState(false)

     return (
        <div className='flex justify-center items-center'>
            {login && <Login />}
            {signIn && <SignIn />}

            {!login && !signIn &&  (
                <div className='bg-gray-200 p-3 rounded'>
                    <div className='flex justify-end p-2'>
                        <button>X</button>
                    </div>
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