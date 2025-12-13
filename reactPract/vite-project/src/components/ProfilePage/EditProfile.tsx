import { Formik, Form, Field } from "formik";
import { Image, Upload } from "antd";
import type { GetProp, UploadProps, UploadFile} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {selectUser, editThunk, userType} from '../../store/reducers/profilePageSlice'
import { useNavigate } from 'react-router-dom'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {deleteThunk} from '../../store/reducers/authInfoSlice'

type initialValuesType = {
    avatar: File | null,
    profilePhoto: File | null,
    about: string
}
// Доробити новий Input type file
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditProfile = () => {
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
                    <Form className="flex flex-col items-center gap-5">
                        <input type="file" name="profilePhoto" onChange={(e) => 
                            setFieldValue('profilePhoto', e.currentTarget.files?.[0] ?? null)} />

                        <input type="file" name="avatar" onChange={(e) => 
                            setFieldValue('avatar', e.currentTarget.files?.[0] ?? null)}/>

                        <Field  type='text' name='about' placeholder='changeDescription' />

                        <button type="submit" disabled={isSubmitting}
                        className="w-50" >Save changes</button>
                    </Form>
                )}
            </Formik>


            <button onClick={() => {
                dispatch(deleteThunk())
                navigate('/profile')
            }}>DELETE ACCOUNT</button>
        </div>
    )
}

export default EditProfile