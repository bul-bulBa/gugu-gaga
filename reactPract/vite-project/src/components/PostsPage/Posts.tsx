import {useState, useEffect} from 'react'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {getPostsThunk, selectPosts, selectLastId, clearPosts, deletePostThunk, postType} from '../../store/reducers/postsPageSlice'
import Post from './Post'
import AddPost from './AddPost'
import ReplyPost from './ReplyPost'

const Posts = () => {
    const dispatch = useAppDispatch()
    const posts = useAppState(selectPosts)
    const lastId = useAppState(selectLastId)
    const [reply, setReply] = useState<postType>()

    const getPosts = (lastId: string | undefined) => {
        dispatch(getPostsThunk({lastId, userId: undefined}))
    }

    useEffect(() => {
        getPosts('')

        return () => {
            dispatch(clearPosts())
        }
    }, [])

    return (
        <div className='col-start-2 row-start-2 flex flex-col items-center gap-10 relative'>
            <AddPost />

            <div className='flex flex-col gap-10'>
                {posts.map(p => (
                    <Post post={p} deleteFunc={deletePostThunk} key={p._id} replyFunc={setReply}/>
                ))}
            </div>

            <button onClick={() => getPosts(lastId)}>More posts</button>

            {reply && <ReplyPost closeFunc={setReply} post={reply} />}
        </div>
    )
}

export default Posts