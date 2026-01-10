import { NavLink} from 'react-router-dom'
import {selectDialogs, selectChatters, selectChatter} from '../../store/reducers/dialogsPageSlice'
import { selectAuthId} from '../../store/reducers/authInfoSlice'
import {useAppState} from '../../store/StoreConfig'
import { getMessages } from './DialogsPage'

function DialogItems() {
    const state = useAppState(selectChatters)
    const {_id: chatterId} = useAppState(selectChatter)
    const authUserId = useAppState(selectAuthId)

    return (
            <div className='flex flex-col gap-3 items-start overflow-y-auto'>
            {
                state.map(d => {
                    const p = d.participants
                    const pn = d.participantsNames
                    const otherUser = authUserId === p.userAId ? {id: p.userBId, name: pn.userBName } : {id: p.userAId, name: pn.userAName }

                    const countOfUnread = d.unread[authUserId] !== 0 
                    ? <div className='bg-app-primary rounded-full text-black'>{d.unread[authUserId]}</div>
                    : <span></span>
                    return (
                        <span className={`m-2 rounded-xl p-3 `} 
                        key={`user - ` + otherUser.id} onClick={() => getMessages(otherUser.id)}>
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