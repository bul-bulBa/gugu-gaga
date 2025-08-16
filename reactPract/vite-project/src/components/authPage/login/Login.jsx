import {useDispatch, useSelector} from 'react-redux'
import {setProfile, setProfileAC, loginThunk} from '../../../store/reducers/authInfoSlice'
import UILogin from './UILogin'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import authRecuest from '../../../commonComponents/authRequest'

function Login() {
    const errorF = useSelector(state => state.auth.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const login = () => dispatch(loginThunk({name, password}))

    return (
        <div>
            <UILogin error={errorF} name={name} password={password} setName={setName} setPassword={setPassword} login={login}/>
        </div>
    )
}

export default Login