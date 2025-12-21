import { Formik, Form, Field } from "formik";
import { Image, Upload } from "antd";
import type { GetProp, UploadProps, UploadFile} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {selectUser, editThunk, userType} from '../../store/reducers/profilePageSlice'
import { useNavigate } from 'react-router-dom'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {deleteThunk} from '../../store/reducers/authInfoSlice'
import { selectProfile } from '../../store/reducers/allText'

type initialValuesType = {
    avatar: File | null,
    profilePhoto: File | null,
    about: string
}


const EditProfile = () => {
    const text = useAppState(selectProfile)
    const state: userType = useAppState(selectUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const initialValues: initialValuesType = {
        avatar: null,
        profilePhoto: null,
        about: state.about
    }

    return (
        <div className="flex flex-col justify-between items-center">

            <Formik
            initialValues={initialValues}
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
                    <Form className="flex flex-col items-center gap-10 p-3">
                        <div className="flex flex-col">
                            <span>{text.changeProfilePhoto}</span>
                            <input type="file" name="profilePhoto" onChange={(e) => 
                                setFieldValue('profilePhoto', e.currentTarget.files?.[0] ?? null)} />
                        </div>

                        <div className="flex flex-col">
                            <span>{text.changeAvatar}</span>
                            <input type="file" name="avatar" onChange={(e) => 
                                setFieldValue('avatar', e.currentTarget.files?.[0] ?? null)}/>
                        </div>

                        <div className="flex flex-col">
                            <span>{text.changeAbout}</span>
                            <Field  type='text' name='about' placeholder='changeDescription' />
                        </div>

                        <button type="submit" disabled={isSubmitting}
                        className="w-50" >{text.save}</button>
                    </Form>
                )}
            </Formik>


            <button onClick={() => {
                dispatch(deleteThunk())
                navigate('/profile')
            }}>{text.deleteAccount}</button>
        </div>
    )
}

export default EditProfile