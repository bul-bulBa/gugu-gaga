import {DeleteOutlined, HeartFilled, HeartOutlined, CommentOutlined} from '@ant-design/icons'
import { Image } from 'antd'
import defaultAvatar from '../../assets/userPhoto.webp'
import { useAppDispatch, useAppState } from "../../store/StoreConfig"
import { postType, deletePostThunk, toggleLikeThunk, 
    fileType, replyHistoryThunk, selectIsHistory, setHistory } from "../../store/reducers/postsPageSlice"
import {selectAuthId} from '../../store/reducers/authInfoSlice'


type propsType = {
    post: postType,
    replyFunc?: React.Dispatch<React.SetStateAction<postType | undefined>>
}

const Post = (props: propsType) => {
    const dispatch = useAppDispatch()
    const userId = useAppState(selectAuthId)
    const isHistory = useAppState(selectIsHistory)

    const deletePost = () => dispatch(deletePostThunk(props.post._id))

    const toggleLike = () => {
        dispatch(toggleLikeThunk({postId: props.post._id, userId: props.post.user._id}))
    }
    
    const position = props.post.img?.length === 1 ? 'w-full' : 'w-[49%]'
    const renderImages = (arr?: fileType[] | null) => {
        // console.log(arr)
    return arr?.length
    ? arr.map((file, i) => (
        <div key={i} className={`${position}`}>
          {file.type === 'image/png' || file.type === 'image/gif'
          ? <Image
            src={file.url}
            className="rounded-xl"
            style={{ width: "100%", maxWidth: '100%', height: "auto", display: "block" }}
          />
          : <video src={file.url} controls/>
          }
        </div>
      ))
    : null;
    }


    const imgArray = props.post.img ? renderImages(props.post.img) : null
    const repliedImgArray = props.post.repliedPost ? renderImages(props.post.repliedPost.img) : null

    return (
        <div className="flex flex-col gap-3 p-3 w-[70%]">
            {/* POST */}
            <div className="flex justify-start items-center gap-2">
                {!props.post.user.avatar
                ? <img src={defaultAvatar} alt="avatar"  className="w-10 h-10 rounded-full"/>
                : <img src={props.post.user.avatar} alt="avatar"  className="w-10 h-10 rounded-full"/>}
                <p className="">{props.post.user.name}</p>
            </div>

            <div className="flex text-start break-all whitespace-pre-wrap">{props.post.text}</div>
            <div className='flex flex-wrap gap-2'>{imgArray}</div>

            {/* REPLIED POST */}
            {props.post.repliedPost && Object.keys(props.post.repliedPost || {}).length > 0 && 
                <div className='flex flex-col gap-3 border-l-1 m-2 p-2' onClick={() => dispatch(replyHistoryThunk(props.post._id))}>
                    <div className="flex justify-start">
                        {!props.post.repliedPost.avatar
                        ? <img src={defaultAvatar} alt="avatar"  className="w-7 h-7 rounded-full"/>
                        : <img src={props.post.repliedPost.avatar} alt="avatar"  className="w-7 h-7 rounded-full"/>}
                        <p className="">{props.post.repliedPost.name}</p>
                    </div>
                    <div className="flex text-start break-all whitespace-pre-wrap">{props.post.repliedPost.text}</div>
                    <div className='flex flex-wrap gap-2'>{repliedImgArray}</div>
                </div>}

            {/* REACTION */}
            {!isHistory &&
                <div className='flex justify-around md:justify-start md:gap-5'>
                    {props.replyFunc && <div className='col-start-1 row-start-3'
                    onClick={() => {
                        dispatch(setHistory(true))
                        props.replyFunc?.(props.post)}
                    }><CommentOutlined /></div>}
    
                    <div className='flex gap-2' onClick={toggleLike}>
                        {props.post.liked ? <HeartFilled /> : <HeartOutlined /> }
                        <div className=''>{props.post.likes}</div>
                    </div>
                    
                    {userId === props.post.user._id && 
                    <div className="" onClick={deletePost}><DeleteOutlined /></div>}
                </div>
            }
        </div>
    )
}

export default Post