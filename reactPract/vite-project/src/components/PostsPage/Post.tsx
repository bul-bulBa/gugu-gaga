import {DeleteOutlined} from '@ant-design/icons'
import defaultAvatar from '../../assets/userPhoto.webp'
import { useAppDispatch, useAppState } from "../../store/StoreConfig"
import { postType, deletePostThunk } from "../../store/reducers/postsPageSlice"
import {selectAuthId} from '../../store/reducers/authInfoSlice'

type propsType = {
    post: postType,
    deleteFunc: (id: string) => ReturnType<typeof deletePostThunk>
}

const Post = (props: propsType) => {
    const dispatch = useAppDispatch()
    const userId = useAppState(selectAuthId)

    const deletePost = () => {
        dispatch(props.deleteFunc(props.post._id))
    }

    return (
        <div className="grid grid-cols[10px_1fr] grid-rows[10px_200px] p-3 w-[220px]">
            <div className="col-start-1 row-start-1">
                {!props.post.user.avatar
                ? <img src={defaultAvatar} alt="avatar"  className="w-10 h-10 rounded-full"/>
                : <img src={props.post.user.avatar} alt="avatar"  className="w-10 h-10 rounded-full"/>}
            </div>
            <div className="col-start-2 row-start-1 flex justify-start">{props.post.user.name}</div>
            <div className="col-start-1 col-span-2 row-start-2 flex justify-start">{props.post.text}</div>

            {userId === props.post.user._id && 
            <div className="col-start-2 row-start-1 flex justify-end" onClick={deletePost}><DeleteOutlined /></div>}
        </div>
    )
}

export default Post