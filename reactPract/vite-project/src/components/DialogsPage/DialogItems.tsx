import { NavLink } from 'react-router-dom'
import { selectChatters } from '../../store/reducers/dialogsPageSlice'
import { useAppState, useAppDispatch } from '../../store/StoreConfig'
import { setChatter } from '../../store/reducers/dialogsPageSlice'
import { apiWS } from '../../api/apiWS'
import { useGetUsers } from '../../lib/useGetUsers'

function DialogItems() {
    const state = useAppState(selectChatters)
    const dispatch = useAppDispatch()
    const { userA, userB } = useGetUsers()

    return (
        <div className='flex flex-col gap-3 items-start overflow-y-auto'>
            {
                state.map(d => {
                    const p = d.participants
                    const pn = d.participantsNames
                    const otherUser = userA === p.userAId ? { id: p.userBId, name: pn.userBName } : { id: p.userAId, name: pn.userAName }

                    const countOfUnread = d.unread[userA] !== 0
                        ? <div className='bg-app-primary rounded-full text-black'>{d.unread[userA]}</div>
                        : <span></span>
                    return (
                        <span className={`m-2 rounded-xl p-3 `}
                            key={`user - ` + otherUser.id} onClick={() => {
                                dispatch(setChatter(otherUser.id))
                                apiWS.getMessages(userA, otherUser.id)
                            }}>
                            <NavLink to={`/dialogs/${otherUser.id}`} className='flex flex-col items-start'>
                                <div className=''> <span>{otherUser.name}</span> {countOfUnread} </div>
                                <span className='font-light'>{d.lastMessage}</span>
                            </NavLink>
                        </span>
                    )
                })
            }
        </div>
    )
}

export default DialogItems