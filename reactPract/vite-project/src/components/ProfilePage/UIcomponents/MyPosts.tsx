import {useState, useEffect} from 'react'
import { useAppDispatch, useAppState } from "../../../store/StoreConfig"
import Post from '../../PostsPage/Post'
import { getUserPostsThunk, deleteUserPostsThunk,
  selectUser, selectPosts, selectLastId } from '../../../store/reducers/profilePageSlice'


function MyPosts() {
    const dispatch = useAppDispatch()
    const posts = useAppState(selectPosts)
    const user = useAppState(selectUser)
    const lastId = useAppState(selectLastId)

    const getPosts = (lastId: string | undefined) => {
      dispatch(getUserPostsThunk({lastId, userId: user.id}))
    }

    useEffect(() => {
      if(user.id) {getPosts(undefined)}
    }, [user])

    return (
      <div className='flex flex-col items-start p-3'>

        {posts.map(p => (
          <Post post={p} deleteFunc={deleteUserPostsThunk} key={p._id}/>
        ))}

        <button onClick={() => getPosts(lastId)}>More posts</button>
      </div>
    )
}

export default MyPosts