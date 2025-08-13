import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import UISignIn from './UISignIn'
import axios from 'axios'
import authRecuest from '../../../commonComponents/authRequest'

function SignIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        [!form.name, () => setNamePlaceholder('invalid name')],
        [!form.password, () => setPasswordPlaceholder('invalidPassword')],
        [!form.city, () => setCityPlaceholder('invalid city(joke)')],
        [!form.country, () => setCountryPlaceholder('invalid country(joke)')]
    ]

    const [hasErr, setHasErr] = useState(false)

    const authorize = () => {
        
        for(const [condition, action] of validations) {
            if(condition) {
                action()
                setHasErr(true)
            }
        }

        if(hasErr) return;
        axios.post('http://localhost:3000/profile', {
            name: form.name, 
            password: form.password, 
            location: {country: form.country, city: form.city}
        })
        .then(() => authRecuest(form.name, form.password, dispatch, navigate))
        .catch(err => {
            if(err.response) {
                if(err.response.status === 409) {
                    
                }
            }
        })
    }

    return (
        <>
            <UISignIn form={form} updateForm={updateForm} authorize={authorize} />
        </>
    )
}

export default SignIn