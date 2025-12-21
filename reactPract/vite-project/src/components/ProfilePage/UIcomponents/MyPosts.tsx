import {useState, useEffect} from 'react'
import { useAppDispatch, useAppState } from "../../../store/StoreConfig"
import Post from '../../PostsPage/Post'
import { selectUser } from '../../../store/reducers/profilePageSlice'
import {selectPosts, selectLastId, getPostsThunk} from '../../../store/reducers/postsPageSlice'
import { selectPosts as selectPostsText } from '../../../store/reducers/allText'

function MyPosts() {
    const text = useAppState(selectPostsText)
    const dispatch = useAppDispatch()
    const posts = useAppState(selectPosts)
    const lastId = useAppState(selectLastId)
    const user = useAppState(selectUser)

    const getPosts = () => {
      dispatch(getPostsThunk({lastId, userId: user.id}))
    }

    useEffect(() => {
      if(user.id) {getPosts()}
    }, [user])

    return (
      <div className='flex flex-col items-start p-3'>

        {posts.map(p => (
          <Post post={p} key={p._id}/>
        ))}

        <button onClick={() => getPosts()}>{text.morePosts}</button>
      </div>
    )
}

export default MyPosts