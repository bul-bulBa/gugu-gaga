import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {signUpThunk, selectError, selectIsAuth} from '../../store/reducers/authInfoSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'

function SignUp() {
    const ERROR = useSelector(selectError)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])
    return (
        <Formik
            initialValues={{name: '', password: '', country: '', city: '', captcha: ''}}
            validate={values => {
                let errors = {}
                const valuesArr = Object.entries(values) 
                valuesArr.forEach(([key, value]) => {
                    if(!value) errors[key] = 'required'
                });
                return errors
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await dispatch(signUpThunk(values))
                setSubmitting(false)
            }}
            >
                {({isSubmitting, setFieldValue}) => (
                    <Form className='border rounded p-3 flex flex-col gap-2'>
                    <Field type='text' name='name' placeholder='name' />
                    <ErrorMessage name='name' component='div' className='text-red-200'/>

                    <Field type='password' name='password' placeholder='password' />
                    <ErrorMessage name='password' component='div' className='text-red-200' />

                    <Field type='text' name='country' placeholder='your country' />
                    <ErrorMessage name='country' component='div' className='text-red-200'/>

                    <Field type='text' name='city' placeholder='your city' />
                    <ErrorMessage name='city' component='div' className='text-red-200'/>
                    
                    <ReCAPTCHA 
                        sitekey='6LeErq0rAAAAAJX6b5rNGoY__g9t8nlhLPpIjYtU'
                        onChange={value => setFieldValue('captcha', value)}/>

                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>

                    {ERROR && <div className='text-red-300'>{ERROR}</div>}
                </Form>
                )}
        </Formik>
    )
}

export default SignUp