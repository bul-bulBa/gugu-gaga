import { NavLink, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'


function DialogItems(props) {
    const state = useSelector(store => store.dialogs)
    

    return (
        <div className='flex gap-[15%] p-10'>
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

            <div className='border-r-1'></div>

            <Outlet />
        </div>
    )
}

export default DialogItems