import { useState } from 'react'
import image from '../../public/vite.svg'
import '../App.css'
import {NavLink} from 'react-router-dom'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import {useAppState, useAppDispatch} from '../store/StoreConfig'
import {logoutThunk, selectIsAuth, authInfoType} from '../store/reducers/authInfoSlice'

function Header() {
    const state: boolean = useAppState(selectIsAuth)
    const dispatch = useAppDispatch()
    // state for rerender when theme was changed
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme'))

    const changeTheme = () => {
        const color = localStorage.getItem('theme')
        const newColor = color === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', newColor)
        document.documentElement.classList.toggle('dark')
        setIsDark(newColor)
        console.log(document.documentElement.classList.contains('dark'))
    }

    return (
            <div className='col-start-1 row-start-1 border border-border bg-bg rounded-xl flex justify-between items-center p-2 w-full
            md:col-start-1 md:col-span-2 md:row-start-1'>
                <img className="w-[40px] m-4" src={image} alt="" />
                <div className='flex gap-5 items-center'>
                    <div onClick={changeTheme}>
                        {isDark === 'dark'
                            ? <MoonOutlined />
                            : <SunOutlined />
                        }
                    </div>
                    {!state
                    ? <span> <NavLink to="/auth"> <button>Log in</button> </NavLink> </span>
                    : <button onClick={() => dispatch(logoutThunk())}>Log out</button>
                    }
                </div>
            </div>
    )
}

export default Header