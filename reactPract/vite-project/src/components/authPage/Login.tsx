import {loginThunk} from '../../store/reducers/authInfoSlice'
import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {selectError, selectIsAuth} from '../../store/reducers/authInfoSlice'
import ReCAPTCHA from 'react-google-recaptcha'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import { selectTheme } from '../../store/reducers/rerender'
import { selectAuthorization } from '../../store/reducers/allText'

type initialValuesType = {password: string, email: string, captcha: string}

function Login() {
    const text = useAppState(selectAuthorization)
    const ERROR = useAppState(selectError)
    const dispatch = useAppDispatch()
    const initialValues: initialValuesType = {password:'', email:'', captcha: ''}
    const isDark= useAppState(selectTheme)
    console.log(isDark)

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validate={values => {
                let errors: Record<string, string> = {};
                Object.entries(values).forEach(([key, value]) => {
                    if(!value) {errors[key] = `${key} ${text.isRequired}`}
                })
                return errors
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await dispatch(loginThunk(values))
                setSubmitting(false)
            }}
            >
                {({isSubmitting, setFieldValue}) => (
                <Form className='border rounded p-3 flex flex-col gap-2'>
                    <Field type="email" name="email" placeholder={text.emailPlaceholder} />
                    <ErrorMessage name='email' component='div' className='text-red-200' />

                    <Field type='password' name='password' placeholder={text.passwordPlaceholder} />
                    <ErrorMessage name='password' component='div' className='text-red-200' />
                    
                    {/* key need for trigger to change theme */}
                    <ReCAPTCHA 
                        key={isDark}
                        sitekey='6LcYNLkrAAAAABQ84800-X6mPGP6vtKu-84bdDD9'
                        onChange={value => setFieldValue('captcha', value)}
                        theme={isDark === 'dark' ? 'dark' : 'light'}
                    />
                    <ErrorMessage name='captcha' component='div' className='text-red-200' />

                    <button type='submit' disabled={isSubmitting}>
                        {text.submit}
                    </button>

                    {ERROR && <div className='text-red-300'>{ERROR}</div>}
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login