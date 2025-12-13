import {useState, useEffect} from 'react'
import { useAppDispatch } from '../store/StoreConfig'
import { setColorTheme } from '../store/reducers/rerender'

export const colorThemes = [ 'green', 'purple', 'red', 'blue', 'orange', 'yellow' ]

const ColorTheme = () => {
    const dispatch = useAppDispatch()
    const [show, setShow] = useState<boolean>(false)

    const changeTheme = (newColor: typeof colorThemes[number]) => {
        const html = document.documentElement.classList
        colorThemes.forEach(t => html.remove(t))
        html.add(newColor)

        localStorage.setItem('color', newColor)

        dispatch(setColorTheme(newColor))
    }

    useEffect(() => {
        const color = localStorage.getItem('color')
        if(color) document.documentElement.classList.add(color)
    }, [])

    return (
        <div>
            <div className="w-5 h-5 bg-app-primary rounded-full" onClick={() => setShow(!show)}>
                {show && 
                    <div className='flex flex-col gap-5 p-3 bg-white border rounded absolute z-2'>
                        {colorThemes.map(t => (
                            <div key={t} onClick={() => {
                                changeTheme(t)
                                setShow(false) } } 
                                // якщо писати без зовнішнього ${}, то tailwind не встановить в стилі ці кольори
                            className={`w-5 h-5 ${`bg-${t}-500`} rounded-full`}></div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default ColorTheme