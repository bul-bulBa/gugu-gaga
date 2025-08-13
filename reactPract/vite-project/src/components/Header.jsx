import React from "react";
import image from '../../public/vite.svg'
import '../App.css'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {
    const state = useSelector(state => state.auth)

    return (
            <div className='col-start-1 col-span-2 row-start-1 bg-green-600 flex alingn-items-center'>
                <img className="w-[40px] m-4" src={image} alt="" />

                {!state.isAuth
                ? <span> <NavLink to="/auth"> Login </NavLink> </span>
                : <span>gugu gaga</span>
                }
            </div>
    )
}

export default Header