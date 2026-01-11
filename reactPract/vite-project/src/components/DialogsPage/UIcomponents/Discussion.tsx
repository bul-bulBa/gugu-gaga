import { useRef, useEffect, useState } from 'react'
import {dialogsMessageType, selectChatter, selectDialogs, exitFromDialog} from '../../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../../store/StoreConfig'
import Message from './Message'
import { apiWS } from '../../../api/apiWS'
import { useGetUsers } from '../../../lib/useGetUsers'

type propsType = {state: Array<dialogsMessageType>}

const Discussion = () => {
    const {userA, userB} = useGetUsers()
    const dispatch = useAppDispatch()
    const state = useAppState(selectDialogs)
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    
    const reverseLastIndex = [...state].reverse().findIndex(m => m.readerId === userA)
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
    
    useEffect(() => {
      const rootEl = containerRef.current
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // debugger
            if (entry.isIntersecting && !state[lastIndex].read) {
              // console.log('MESSAGE IS READ', state[lastIndex].read, state[lastIndex])
              apiWS.onRead(userA, userB)
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
    <div ref={containerRef} className='flex-1 flex flex-col gap-[10px] min-h-0 overflow-y-auto scrollbar-hide w-full'>

      {state.map((m, i) => {
        const time = new Date(m.updatedAt).toTimeString().slice(0, 5)
        const message = m.writerId === userA
        ? <Message key={m._id} position={'right'} message={m} date={time} />
        : <Message key={m._id} position={'left'} message={m} date={time}/>
        return <div ref={i === lastIndex ? lastMessageRef : null} key={m._id}>{message}</div>
      })}

    </div>
  )
}

export default Discussion
