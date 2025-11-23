import {useState} from 'react'
import { useAppDispatch, useAppState } from "../../store/StoreConfig"
import {Dispatch, SetStateAction} from 'react'
import defaultAvatar from '../../assets/userPhoto.webp'
import { postType } from "../../store/reducers/postsPageSlice"
import { replyPostThunk } from "../../store/reducers/postsPageSlice"
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
                <button className='rounded-full bg-stone-200' onClick={() => closeFunc(undefined)}>X</button>
            </div>

            <div className="grid grid-cols[10px_1fr] grid-rows[10px_200px_100px] p-3 w-[220px]">
                <div className="col-start-1 row-start-1">
                    {!post.user.avatar
                        ? <img src={defaultAvatar} alt="avatar"  className="w-10 h-10 rounded-full"/>
                        : <img src={post.user.avatar} alt="avatar"  className="w-10 h-10 rounded-full"/>}
                </div>
                <div className="col-start-2 row-start-1 flex justify-start">{post.user.name}</div>
                <div className="col-start-1 col-span-2 row-start-2 flex justify-start">{post.text}</div>
                {post.img && <div className='col-start-1 col-span-2, row-start-3 w-full'><img src={post.img[0]} alt="" /></div>}
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