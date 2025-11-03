import image from '../../public/vite.svg'
import '../App.css'
import {NavLink} from 'react-router-dom'
import {useAppState, useAppDispatch} from '../store/StoreConfig'
import {logoutThunk, selectIsAuth, authInfoType} from '../store/reducers/authInfoSlice'

function Header() {
    const state: boolean = useAppState(selectIsAuth)
    const dispatch = useAppDispatch()

    return (
            <div className='col-start-1 row-start-1 border border-border bg-bg rounded-xl flex justify-between alingn-items-center p-2 w-full
            md:col-start-1 md:col-span-2 md:row-start-1'>
                <img className="w-[40px] m-4" src={image} alt="" />

                {!state
                ? <span> <NavLink to="/auth"> <button>Log in</button> </NavLink> </span>
                : <button onClick={() => dispatch(logoutThunk())}>Log out</button>
                }
            </div>
    )
}

export default Header