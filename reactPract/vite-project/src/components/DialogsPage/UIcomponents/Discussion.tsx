import '../../../App.css'
import { useRef, useEffect, useState } from 'react'
import {dialogsMessageType, selectChatter} from '../../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../../store/StoreConfig'
import {selectAuthId} from '../../../store/reducers/authInfoSlice'
import {selectUser, } from '../../../store/reducers/profilePageSlice'
import { onRead } from '../DialogsPage'
import Message from './Message'

type propsType = {state: Array<dialogsMessageType>}

const Discussion = ({state}: propsType) => {
    // const {name, avatar} = useAppState(selectChatter)
    const user = useAppState(selectUser)
    const id = useAppState(selectAuthId)
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [hasBeenRead, setHasBeenRead] = useState(false)

    const lastIndex = [...state].reverse().findIndex(m => m.readerId === id)
    const actualIndex = lastIndex === -1 ? -1 : state.length - 1 - lastIndex

    useEffect(() => {
      // Observe the last message inside the scrollable container.
      // Use the container as the root so intersection is calculated relative to the scrollable div.
      const rootEl = containerRef.current
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasBeenRead) {
              console.log('MESSAGE IS READ')
              setHasBeenRead(true)
              onRead()
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
      // Re-run when the observed element index or read state changes.
    }, [actualIndex, hasBeenRead])

  return (
    <div ref={containerRef} className='flex flex-col gap-[10%] h-[500px] overflow-y-auto scrollbar-hide w-full'>

      {state.map((m, i) => {
        const time = new Date(m.updatedAt).toTimeString().slice(0, 5)
        const message = m.writerId === id
        ? <Message key={m._id} position={'right'} message={m} date={time} />
        : <Message key={m._id} position={'left'} message={m} date={time}/>
        return <div ref={i === actualIndex ? lastMessageRef : null} key={m._id}>{message}</div>
      })}

    </div>
  )
}

export default Discussion
