import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import {selectUser, editThunk} from '../../store/reducers/profilePageSlice'
import {useNavigate} from 'react-router-dom'

function EditProfile() {
    const state = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>

            <Formik
            initialValues={{
                avatar: '',
                profilePhoto: '',
                about: state.about,
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await dispatch(editThunk({
                    avatar: values.avatar,
                    profilePhoto: values.profilePhoto,
                    about: values.about
                }))
                setSubmitting(false)
                navigate('/profile')
            }}
            >
                {({isSubmitting, setFieldValue}) => (
                    <Form className="flex flex-col gap-5 p-4">
                        <input type="file" name="profilePhoto" onChange={(e) => 
                            setFieldValue('profilePhoto', e.currentTarget.files[0])} />

                        <input type="file" name="avatar" onChange={(e) => 
                            setFieldValue('avatar', e.currentTarget.files[0])}/>

                        <Field  type='text' name='about' placeholder='changeDescription' />

                        <button type="submit" disabled={isSubmitting}>Save changes</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default EditProfile