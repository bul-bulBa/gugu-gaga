import { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { useAppDispatch, useAppState } from "../../../store/StoreConfig"
import Post from '../../PostsPage/Post'
import { selectUser } from '../../../store/reducers/profilePageSlice'
import { selectPosts, selectLastId, getPostsThunk } from '../../../store/reducers/postsPageSlice'
import { selectPosts as selectPostsText } from '../../../store/reducers/allText'
import { useLoad } from '../../../lib/useLoad'

function MyPosts() {
  const text = useAppState(selectPostsText)
  const dispatch = useAppDispatch()
  const posts = useAppState(selectPosts)
  const lastId = useAppState(selectLastId)
  const user = useAppState(selectUser)

  const getPosts = () => {
    dispatch(getPostsThunk({ lastId, userId: user.id }))
  }

  const ref = useLoad(getPosts, lastId)

  useEffect(() => {
    if (user.id) { getPosts() }
  }, [user])

  return (
    <div className='flex flex-col items-start p-3'>

      {posts.map(p => (
        <Post post={p} key={p._id} blockHistory={true} />
      ))}

      <div>
        <div ref={ref} ></div>
        <div className='m-[5px]'>{text.morePosts} <Spin /></div>
      </div>
      {/* <button onClick={() => getPosts()}>{text.morePosts}</button> */}
    </div>
  )
}

export default MyPosts