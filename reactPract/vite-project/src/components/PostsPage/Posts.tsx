import {useState, useEffect} from 'react'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import {getPostsThunk, selectPosts, selectLastId, clearPosts, deletePostThunk} from '../../store/reducers/postsPageSlice'
import Post from './Post'
import AddPost from './AddPost'
 
const Posts = () => {
    const dispatch = useAppDispatch()
    const posts = useAppState(selectPosts)
    const lastId = useAppState(selectLastId)

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
        <div className='col-start-2 row-start-2 flex flex-col items-center gap-10'>
            <AddPost />

            <div className='flex flex-col gap-10'>
                {posts.map(p => (
                    <Post post={p} deleteFunc={deletePostThunk} key={p._id}/>
                ))}
            </div>

            <button onClick={() => getPosts(lastId)}>More posts</button>
        </div>
    )
}

export default Posts