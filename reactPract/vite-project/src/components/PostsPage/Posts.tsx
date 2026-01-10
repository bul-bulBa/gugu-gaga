import {useState, useEffect, useRef} from 'react'
import { Divider, Spin } from 'antd'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {getPostsThunk, selectPosts, selectLastId, 
    clearPosts, deletePostThunk, postType,
    selectIsHistory, } from '../../store/reducers/postsPageSlice'
import Post from './Post'
import AddPost from './AddPost'
import ReplyPost from './ReplyPost'
import { selectPosts as selectPostsText } from '../../store/reducers/allText'
import { useLoad } from '../../lib/useLoad'

const Posts = () => {
    const text = useAppState(selectPostsText)
    const dispatch = useAppDispatch()
    const posts = useAppState(selectPosts)
    const lastId = useAppState(selectLastId)
    const isHistory = useAppState(selectIsHistory)
    const [reply, setReply] = useState<postType>()
    
    const getPosts = (lastId: string | undefined) => {
        dispatch(getPostsThunk({lastId, userId: undefined}))
    }
    
    const ref = useLoad(getPosts, lastId)

    useEffect(() => {
        getPosts('')

        return () => {
            dispatch(clearPosts())
        }
    }, [])
    
    return (
        <div className='md:col-start-2 md:row-start-2 flex flex-col items-center gap-10 relative scroll-area'>
            {!isHistory ? <AddPost /> : <div>History of replies</div>}

            <div className='flex flex-col items-center gap-10'>
                {posts.map(p => (
                    <Post post={p} key={p._id} replyFunc={setReply} blockHistory={false} />
                ))}
            </div>

            {!isHistory &&
            <div>
                <div ref={ref} ></div>
                <div className='m-[5px]'>{text.morePosts} <Spin /></div>
            </div>}
            {/* {!isHistory && <button onClick={() => getPosts(lastId)}>{text.morePosts}</button>} */}
            {reply && <ReplyPost closeFunc={setReply} post={reply} />}
        </div>
    )
}

export default Posts