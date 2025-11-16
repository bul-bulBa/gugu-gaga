import { NavLink} from 'react-router-dom'
import {selectDialogs, selectChatters} from '../../store/reducers/dialogsPageSlice'
import { selectAuthId} from '../../store/reducers/authInfoSlice'
import {useAppState} from '../../store/StoreConfig'
import { getMessages } from './DialogsPage'

function DialogItems() {
    const state = useAppState(selectChatters)
    const authUserId = useAppState(selectAuthId)

    return (
            <div className='flex flex-col gap-3 items-start'>
            {
                state.map(d => {
                    console.log(d)
                    const p = d.participants
                    const pn = d.participantsNames
                    const otherUser = authUserId === p.userAId ? {id: p.userBId, name: pn.userBName } : {id: p.userAId, name: pn.userAName }
                    const countOfUnread = d.unread?.[authUserId]
                    return (
                        <span key={`user - ` + otherUser.id} onClick={() => getMessages(otherUser.id)}>
                            <NavLink to={`/dialogs/${otherUser.id}`} className='flex flex-col items-start'>
                                <div> <span>{otherUser.name}</span> <span>{countOfUnread}</span> </div>
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