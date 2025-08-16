import {useState} from 'react'
import Login from '../components/authPage/login/Login'
import SignUp from '../components/authPage/signUp/SignUp'

function AuthModalWindow() {

    const [login, setLogin] = useState(false) 
    const [signIn, setSignIn] = useState(false)


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