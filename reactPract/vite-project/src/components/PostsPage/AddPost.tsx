import {useState, useEffect} from 'react'
import { Formik, Form, Field} from 'formik'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {addPostThunk, addPostType} from '../../store/reducers/postsPageSlice'
import { FileImageOutlined} from '@ant-design/icons'
import { Input } from 'antd';

const { TextArea } = Input;

const AddPost = () => {
    const dispatch = useAppDispatch()
    // const [text, setText] = useState<string>('')

    // const addPost = () => {
    //     dispatch(addPostThunk(text))
    // }

    const initialValues = { file: null, text: '' } as addPostType

    return (
        <div className='border border-stone-200'>
            {/* <TextArea 
            style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
            className='scrollbar-hide'
            placeholder="What's happening?" 
            autoSize 
            onChange={(e) => setText(e.target.value)}/>
            {!text 
            ? <button style={{color: '#a8a29e', borderColor: '#a8a29e'}} >Post</button>
            : <button onClick={addPost}>Post</button>} */}

            <Formik
            initialValues={initialValues}
            onSubmit={ (values, {setSubmitting}) => {
                if(!values.text.trim()) return 
                dispatch(addPostThunk(values))
                setSubmitting(false)
            }}
            >
                {({values, isSubmitting, setFieldValue}) => (
                    <Form>

                        <TextArea 
                            style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
                            className='scrollbar-hide'
                            placeholder="What's happening?" 
                            autoSize 
                            onChange={(e) => setFieldValue('text', e.target.value)}/>

                            <div className='flex justify-between items-center p-3'>
                                <input id='imageUpload' type="file" name='file' multiple onChange={(e) => {
                                    const newFiles = Array.from(e.currentTarget.files ?? [])
                                    const prev = values.file ?? []
                                    setFieldValue('file', [...prev, ...newFiles])
                                }} className='hidden' /> 
                                
                                <label htmlFor="imageUpload" className="cursor-pointer">
                                  <FileImageOutlined />
                                </label>

                                {!values.text
                                ? <button style={{color: '#a8a29e', borderColor: '#a8a29e'}} >Post</button>
                                : <button type='submit' disabled={isSubmitting}>Post</button>}
                            </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddPost