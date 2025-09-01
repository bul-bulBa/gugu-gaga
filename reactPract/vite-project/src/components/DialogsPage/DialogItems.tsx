import { NavLink} from 'react-router-dom'
import {selectDialogs, dialogsStateType} from '../../store/reducers/dialogsPageSlice'
import {useAppState} from '../../store/StoreConfig'


function DialogItems() {
    const state: dialogsStateType = useAppState(selectDialogs)
    

    return (
            <div className='flex flex-col gap-3 items-start'>
            {
                state.map(d => (
                    <span key={`user - ` + d.id}>
                        <NavLink to={`/dialogs/${d.id}`}>
                            {d.name}
                        </NavLink>
                    </span>
                ))
            }
            </div>
    )
}

export default DialogItems