import {useState, useEffect} from 'react'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {addPostThunk} from '../../store/reducers/postsPageSlice'
import { Input } from 'antd';

const { TextArea } = Input;

const AddPost = () => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>('')

    const addPost = () => {
        dispatch(addPostThunk(text))
    }

    return (
        <div className='border border-stone-200'>
            <TextArea 
            style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
            placeholder="What's happening?" 
            autoSize 
            onChange={(e) => setText(e.target.value)}/>
            {!text 
            ? <button style={{color: '#a8a29e', borderColor: '#a8a29e'}} >Post</button>
            : <button onClick={addPost}>Post</button>}
        </div>
    )
}

export default AddPost