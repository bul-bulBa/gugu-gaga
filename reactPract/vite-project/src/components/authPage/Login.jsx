import {useDispatch, useSelector} from 'react-redux'
import {loginThunk} from '../../store/reducers/authInfoSlice'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {selectError, selectIsAuth} from '../../store/reducers/authInfoSlice'
import ReCAPTCHA from 'react-google-recaptcha'

function Login() {
    const ERROR = useSelector(selectError)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])

    return (
        <div>
            <Formik
            initialValues={{name: '', password:'', captcha: ''}}
            validate={values => {
                let errors = {}
                if(!values.name) {errors.name = 'required'}
                if(!values.password) {errors.password = 'required'}
                if(!values.captcha) {errors.captcha = 'required'}
                return errors
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await dispatch(loginThunk(values))
                setSubmitting(false)
            }}
            >
                {({isSubmitting, setFieldValue}) => (
                <Form className='border rounded p-3 flex flex-col gap-2'>
                    <Field type='text' name='name' placeholder='name' />
                    <ErrorMessage name='name' component='div' className='text-red-200'/>

                    <Field type='password' name='password' placeholder='password' />
                    <ErrorMessage name='password' component='div' className='text-red-200' />
                    
                    <ReCAPTCHA 
                        sitekey='6LeErq0rAAAAAJX6b5rNGoY__g9t8nlhLPpIjYtU'
                        onChange={value => setFieldValue('captcha', value)}
                    />
                    <ErrorMessage name='captcha' component='div' className='text-red-200' />

                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>

                    {ERROR && <div className='text-red-300'>{ERROR}</div>}
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login