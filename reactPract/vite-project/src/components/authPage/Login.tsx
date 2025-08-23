import {loginThunk} from '../../store/reducers/authInfoSlice'
import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {selectError, selectIsAuth} from '../../store/reducers/authInfoSlice'
import ReCAPTCHA from 'react-google-recaptcha'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'

type initialValuesType = {name: string, password: string, captcha: string}

function Login() {
    const ERROR: string | null | undefined = useAppState(selectError)
    const dispatch = useAppDispatch()
    const initialValues: initialValuesType = {name: '', password:'', captcha: ''}

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validate={values => {
                let errors: Record<string, string> = {};
                Object.entries(values).forEach(([key, value]) => {
                    if(!value) {errors[key] = `${key} is required`}
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