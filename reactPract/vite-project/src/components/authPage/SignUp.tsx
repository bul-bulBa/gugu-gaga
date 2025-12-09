import {useState, useEffect} from 'react'
import {signUpThunk, selectError} from '../../store/reducers/authInfoSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import { selectTheme } from '../../store/reducers/rerender'

type initialValuesType = {email: string,name: string, password: string, country: string, city: string, captcha: string}

function SignUp() {
    const ERROR: string | null | undefined = useAppState(selectError)
    const dispatch = useAppDispatch()
    const initialValues: initialValuesType = {email: '',name: '', password: '', country: '', city: '', captcha: ''}
    const isDark = useAppState(selectTheme)

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                let errors: Record<string, string> = {};

                Object.entries(values) .forEach(([key, value]) => {
                    if(!value) errors[key] = `${[key]} is required`
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
                    <Field type='email' name='email' placeholder='email' />
                    <ErrorMessage name='email' component='div' className='text-red-200'/>

                    <Field type='password' name='password' placeholder='password' />
                    <ErrorMessage name='password' component='div' className='text-red-200' />

                    <Field type='text' name='name' placeholder='name' />
                    <ErrorMessage name='name' component='div' className='text-red-200'/>

                    <Field type='text' name='country' placeholder='your country' />
                    <ErrorMessage name='country' component='div' className='text-red-200'/>

                    <Field type='text' name='city' placeholder='your city' />
                    <ErrorMessage name='city' component='div' className='text-red-200'/>
                    
                    {/* key need for trigger to change theme */}
                    <ReCAPTCHA 
                        key={isDark}
                        sitekey='6LcYNLkrAAAAABQ84800-X6mPGP6vtKu-84bdDD9'
                        onChange={value => setFieldValue('captcha', value)}
                        theme={isDark === 'dark' ? 'dark' : 'light'}/>
                    <ErrorMessage name='captcha' component='div' className='text-red-200' />

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