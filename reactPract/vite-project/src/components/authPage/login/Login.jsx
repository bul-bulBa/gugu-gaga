import {useDispatch} from 'react-redux'
import {setProfile, setProfileAC} from '../../../store/reducers/authInfoSlice'
import UILogin from './UILogin'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import authRecuest from '../../../commonComponents/authRequest'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const login = () => authRecuest(name, password, dispatch, navigate)

    return (
        <div>
            <UILogin name={name} password={password} setName={setName} setPassword={setPassword} login={login}/>
        </div>
    )
}

export default Login