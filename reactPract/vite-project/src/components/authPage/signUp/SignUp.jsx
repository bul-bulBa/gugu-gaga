import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import UISignUp from './UISignUp'
import {setProfile} from '../../../store/reducers/authInfoSlice'
import {authorize} from '../../../api/api'
import {signUpThunk, setError} from '../../../store/reducers/authInfoSlice'

function SignUp() {
    const ERROR = useSelector(state => state.auth.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(ERROR)
    const [form, setForm] = useState({
        name: '',
        namePlaceholder: 'Genius name',
        password: '',
        passwordPlaceholder: 'Strong password',
        country: '',
        countryPlaceholder: 'Your city',
        city: '',
        cityPlaceholder: 'Your country'
    })

    const updateForm = (field, value) => {
        setForm(prev => ({...prev, [field]: value})) 
    }

    const validations = [
        [!form.name, () => setForm(prev => ({...prev, namePlaceholder: 'invalid name'}))],
        [!form.password, () => setForm(prev => ({...prev, passwordPlaceholder: 'invalid Password'}))],
        [!form.city, () => setForm(prev => ({...prev, countryPlaceholder: 'invalid city(joke)'}))],
        [!form.country, () => setForm(prev => ({...prev, cityPlaceholder: 'invalid country(joke)'}))]
    ]

    // validation 
    let hasErr = false
    
    const authorizeFunc = () => {
        
        for(const [condition, action] of validations) {
            if(condition) {
                action()
                hasErr = true
            }
        }

        if(hasErr) return;
        dispatch(signUpThunk({name: form.name, password: form.password, country: form.country, city: form.city}))
    }

    return (
        <>
            <UISignUp error={ERROR} form={form} updateForm={updateForm} authorize={authorizeFunc} />
        </>
    )
}

export default SignUp