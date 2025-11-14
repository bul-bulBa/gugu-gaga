import { NavLink} from 'react-router-dom'
import {selectDialogs, selectChatters} from '../../store/reducers/dialogsPageSlice'
import {useAppState} from '../../store/StoreConfig'
import { getMessages } from './DialogsPage'

function DialogItems() {
    const state = useAppState(selectChatters)
    
    return (
            <div className='flex flex-col gap-3 items-start'>
            {
                state.map(d => (
                    <span key={`user - ` + d._id} onClick={() => getMessages(d)}>
                        <NavLink to={`/dialogs/${d._id}`}>
                            {d.name}
                        </NavLink>
                    </span>
                ))
            }
            </div>
    )
}

export default DialogItems