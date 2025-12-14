import { useState, useEffect} from 'react'
import { useAppDispatch, useAppState } from "../store/StoreConfig"
import { getTextThunk, selectAllText } from '../store/reducers/allText'

const allLang = [ 'en', 'ua' ]

const Language = () => {
    const dispatch = useAppDispatch() 
    const text = useAppState(selectAllText)
    const [lang, setLang] = useState(localStorage.getItem('language'))
    const [show, setShow] = useState(false)

    const anotherLang = (lang: string) => {
        dispatch(getTextThunk(lang))
        localStorage.setItem('language', lang)
        setLang(lang)
    }

    return (
        <div onClick={() => setShow(!show)}>
            {text.header.language}

            {show &&
                <div className='flex flex-col gap-3 p-3 border absolute rounded bg-white z-2'>
                    {
                        allLang.map(l => (
                            <div key={l} onClick={() => anotherLang(l)}>{l}</div>
                        )) 
                    }
                </div>
            }
        </div>
    )
}

export default Language