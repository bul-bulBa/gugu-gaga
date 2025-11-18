import '../../../App.css'
import { useRef, useEffect, useState } from 'react'
import {dialogsMessageType, selectChatter, selectDialogs, exitFromDialog} from '../../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../../store/StoreConfig'
import {selectAuthId} from '../../../store/reducers/authInfoSlice'
import {selectUser, } from '../../../store/reducers/profilePageSlice'
import { onRead } from '../DialogsPage'
import Message from './Message'

type propsType = {state: Array<dialogsMessageType>}

const Discussion = () => {
    // const {name, avatar} = useAppState(selectChatter)
    const dispatch = useAppDispatch()
    const state = useAppState(selectDialogs)
    const user = useAppState(selectUser)
    const id = useAppState(selectAuthId)
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    
    const reverseLastIndex = [...state].reverse().findIndex(m => m.readerId === id)
    const lastIndex = reverseLastIndex === -1 ? -1 : state.length - 1 - reverseLastIndex

    const handleAutoScroll = () => {
      const container = containerRef.current
      if(!container) return

      const isNearBottom = container.scrollTop - container.clientHeight < 50
      if(!isNearBottom) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      else container.scrollTop = container.scrollHeight
    }

    useEffect(() => {
      return () => {
        dispatch(exitFromDialog())
      }
    }, [])

    useEffect(() =>  handleAutoScroll() , [state])
    
    // console.log(state.map(m => m.read))
    // debugger
    useEffect(() => {
      const rootEl = containerRef.current
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // debugger
            if (entry.isIntersecting && !state[lastIndex].read) {
              // console.log('MESSAGE IS READ', state[lastIndex].read, state[lastIndex])
              onRead()
              observer.disconnect()
            }
          })
        },
        { threshold: 0.5, root: rootEl }
      )

      const el = lastMessageRef.current
      if (el) observer.observe(el)

      return () => {
        if (el) observer.unobserve(el)
        observer.disconnect()
      }
    }, [lastIndex])

  return (
    <div ref={containerRef} className='flex flex-col gap-[10%] h-[500px] overflow-y-auto scrollbar-hide w-full'>

      {state.map((m, i) => {
        const time = new Date(m.updatedAt).toTimeString().slice(0, 5)
        const message = m.writerId === id
        ? <Message key={m._id} position={'right'} message={m} date={time} />
        : <Message key={m._id} position={'left'} message={m} date={time}/>
        return <div ref={i === lastIndex ? lastMessageRef : null} key={m._id}>{message}</div>
      })}

    </div>
  )
}

export default Discussion
