import React from "react";
import image from '../../public/vite.svg'
import '../App.css'
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logoutThunk} from '../store/reducers/authInfoSlice'

function Header() {
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
            <div className='col-start-1 col-span-2 row-start-1 bg-green-600 flex justify-between alingn-items-center p-2'>
                <img className="w-[40px] m-4" src={image} alt="" />

                {!state.isAuth
                ? <span> <NavLink to="/auth"> <button>Log in</button> </NavLink> </span>
                : <button onClick={() => dispatch(logoutThunk())}>Log out</button>
                }
            </div>
    )
}

export default Header