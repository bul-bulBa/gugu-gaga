import {useState, useEffect} from 'react'
import Login from '../components/authPage/Login'
import SignUp from '../components/authPage/SignUp'
import InputCode from './InputCode'
import { useNavigate } from 'react-router-dom'
import {selectIsAuth} from '../store/reducers/authInfoSlice'
import {useAppState} from '../store/StoreConfig' 
import { selectAuthorization } from '../store/reducers/allText'

type pageType = {
    thisPage: 'login' | 'signUp' | 'inputCode' | undefined,
    prevPage: 'login' | 'signUp' | 'inputCode' | undefined }

function AuthModalWindow() {
    const text = useAppState(selectAuthorization)
    const isAuth: boolean = useAppState(selectIsAuth)
    const email: string = useAppState((state) => state.auth.email)
    const navigate = useNavigate()

    const [page, setPage] = useState<pageType>()

    useEffect(() => { if(email) setPage(prev => ({prevPage: prev?.thisPage, thisPage: 'inputCode'})) }, [email])
    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])

    const backFunc = () => setPage(prev => ({thisPage: prev?.prevPage, prevPage: undefined}))

    return (
        <div className='flex flex-col justify-center items-center'>
            
            {page?.thisPage === 'login' ? <Login /> : null}
            {page?.thisPage === 'signUp' ? <SignUp /> : null}
            {page?.thisPage === 'inputCode' ? <InputCode /> : null}

            {page?.thisPage === undefined  &&   (
                <div className='border rounded-xl p-3 rounded'>
                    <div className='flex flex-col gap-3'>
                        <span>
                            <button onClick={() => setPage(prev => ({prevPage: prev?.thisPage, thisPage: 'login'}))}>{text.logIn}</button>
                        </span>
                        <span>
                            <button onClick={() => setPage(prev => ({prevPage: prev?.thisPage, thisPage: 'signUp'}))}>{text.signUp}</button>
                        </span>
                    </div>
                </div>
            )}

            {page?.thisPage !== undefined && <div className='m-3'><button onClick={backFunc}>{text.back}</button></div>}
        </div>
     )
}

export default AuthModalWindow