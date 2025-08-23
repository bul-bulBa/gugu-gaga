import { Formik, Form, Field } from "formik";
import {selectUser, editThunk, userType} from '../../store/reducers/profilePageSlice'
import {useNavigate} from 'react-router-dom'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'

type initialValuesType = {
    avatar: File | null,
    profilePhoto: File | null,
    about: string
}

const EditProfile: React.FC<{}> = () => {
    const state: userType = useAppState(selectUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const initialValues: initialValuesType = {
        avatar: null,
        profilePhoto: null,
        about: state.about
    }

    return (
        <div>

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
                    <Form className="flex flex-col gap-5 p-4">
                        <input type="file" name="profilePhoto" onChange={(e) => 
                            setFieldValue('profilePhoto', e.currentTarget.files?.[0] ?? null)} />

                        <input type="file" name="avatar" onChange={(e) => 
                            setFieldValue('avatar', e.currentTarget.files?.[0] ?? null)}/>

                        <Field  type='text' name='about' placeholder='changeDescription' />

                        <button type="submit" disabled={isSubmitting}>Save changes</button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default EditProfile