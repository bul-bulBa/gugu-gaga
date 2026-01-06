import {useState} from 'react'
import { useAppDispatch, useAppState } from "../../store/StoreConfig"
import {Dispatch, SetStateAction} from 'react'
import defaultAvatar from '../../assets/userPhoto.webp'
import { postType, replyPostThunk, setHistory } from "../../store/reducers/postsPageSlice"
import Post from './Post'
import { Input } from 'antd';

const { TextArea } = Input;

type propsType = {
    post: postType,
    closeFunc: Dispatch<SetStateAction<postType | undefined>>
}

const ReplyPost = ({post, closeFunc}: propsType) => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>('')

    const addReply = () => {
        dispatch(replyPostThunk({repliedPostId: post._id, repliedUserId: post.user._id, text}))
        closeFunc(undefined)
    }

    return (
        <div className='absolute fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[400px] m-0 p-3 border rounded-xl bg-stone-50 flex flex-col gap-5'>
            <div className='flex justify-start'>
                <button className='rounded-full bg-stone-200' onClick={() => {
                    dispatch(setHistory(false))
                    closeFunc(undefined) }}>X</button>
            </div>

            <div className="grid grid-cols[10px_1fr] grid-rows[10px_200px_100px] p-3 w-[220px]">
                <Post post={post} blockHistory={true} />
            </div>
            
            <TextArea 
            style={{ border: 'none', boxShadow: 'none', outline: 'none' }}
            placeholder="What's happening?" 
            autoSize 
            onChange={(e) => setText(e.target.value)}/>
            {!text 
            ? <button style={{color: '#a8a29e', borderColor: '#a8a29e'}} >Post</button>
            : <button onClick={addReply}>Post</button>}
        </div>
    )
}

export default ReplyPost