import {DeleteOutlined, HeartFilled, HeartOutlined, CommentOutlined} from '@ant-design/icons'
import defaultAvatar from '../../assets/userPhoto.webp'
import { useAppDispatch, useAppState } from "../../store/StoreConfig"
import { postType, deletePostThunk, toggleLikeThunk } from "../../store/reducers/postsPageSlice"
import {selectAuthId} from '../../store/reducers/authInfoSlice'


type propsType = {
    post: postType,
    replyFunc?: React.Dispatch<React.SetStateAction<postType | undefined>>
}

const Post = (props: propsType) => {
    const dispatch = useAppDispatch()
    const userId = useAppState(selectAuthId)

    const deletePost = () => dispatch(deletePostThunk(props.post._id))

    const toggleLike = () => {
        dispatch(toggleLikeThunk({postId: props.post._id, userId: props.post.user._id}))
    }

    return (
        <div className="flex flex-col gap-5 p-3 w-[220px]">
            <div className="flex justify-start">
                {!props.post.user.avatar
                ? <img src={defaultAvatar} alt="avatar"  className="w-10 h-10 rounded-full"/>
                : <img src={props.post.user.avatar} alt="avatar"  className="w-10 h-10 rounded-full"/>}
                <p className="">{props.post.user.name}</p>
            </div>

            <div className="flex text-start break-all whitespace-pre-wrap">{props.post.text}</div>

            {props.post.repliedPost && Object.keys(props.post.repliedPost || {}).length > 0 && 
                <div className='flex flex-col gap-3 border rounded-xl m-2 p-2'>
                    <div className="flex justify-start">
                    {!props.post.repliedPost.avatar
                    ? <img src={defaultAvatar} alt="avatar"  className="w-7 h-7 rounded-full"/>
                    : <img src={props.post.repliedPost.avatar} alt="avatar"  className="w-7 h-7 rounded-full"/>}
                    <p className="">{props.post.repliedPost.name}</p>
                </div>
                <div className="flex text-start break-all whitespace-pre-wrap">{props.post.repliedPost.text}</div>
            </div>}

            <div className='flex justify-around'>
                {props.replyFunc && <div className='col-start-1 row-start-3'
                onClick={() => props.replyFunc?.(props.post)}><CommentOutlined /></div>}

                <div className='flex gap-2' onClick={toggleLike}>
                    {props.post.liked ? <HeartFilled /> : <HeartOutlined /> }
                    <div className=''>{props.post.likes}</div>
                </div>

                {userId === props.post.user._id && 
                <div className="" onClick={deletePost}><DeleteOutlined /></div>}
            </div>
        </div>
    )
}

export default Post