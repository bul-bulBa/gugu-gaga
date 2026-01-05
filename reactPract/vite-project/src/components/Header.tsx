import { useEffect, useState } from 'react'
import image from '../../public/vite.svg'
import ColorTheme from '../commonComponents/colorTheme'
import Language from '../commonComponents/Language'
import {NavLink} from 'react-router-dom'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import {useAppState, useAppDispatch} from '../store/StoreConfig'
import {logoutThunk, selectIsAuth, authInfoType} from '../store/reducers/authInfoSlice'
import { setTheme } from '../store/reducers/rerender'
import { selectHeader } from '../store/reducers/allText'


function Header() {
    const state: boolean = useAppState(selectIsAuth)
    const text = useAppState(selectHeader)
    const dispatch = useAppDispatch()
    // state for rerender when theme was changed
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme'))

    const changeTheme = () => {
        const color = localStorage.getItem('theme')
        const newColor = color === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', newColor)
        document.documentElement.classList.toggle('dark')
        setIsDark(newColor)
        dispatch(setTheme(newColor))
    }
    useEffect(() => {
        const color = localStorage.getItem('theme')
        if(color === 'dark') document.documentElement.classList.add('dark')

    }, [isDark])

    return (
            <div className='col-start-1 row-start-1 border rounded-xl flex justify-between items-center p-2 w-full
            md:col-start-1 md:col-span-2 md:row-start-1
            dark:border-stone-400'>
                <img className="w-[40px] m-4" src={image} alt="" />
                <div className='flex gap-5 items-center'>
                    < Language />
                    < ColorTheme />
                    <div onClick={changeTheme}>
                        {isDark === 'dark'
                            ? <MoonOutlined />
                            : <SunOutlined />
                        }
                    </div>
                    {!state
                    ? <span> <NavLink to="/auth"> <button>{text.logIn}</button> </NavLink> </span>
                    : <button onClick={() => dispatch(logoutThunk())}>{text.logOut}</button>
                    }
                </div>
            </div>
    )
}

export default Header