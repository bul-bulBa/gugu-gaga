import {useState} from 'react'
import '../../App.css'
import Discussion from './UIcomponents/Discussion'
import AddMessage from './UIcomponents/AddMessage'
import {useParams} from 'react-router-dom'
import { selectDialogs, dialogsMessageType, selectChatter } from '../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'


const Dialogs = () => {
    const state = useAppState(selectDialogs)
    const chatter = useAppState(selectChatter)
    const dispatch = useAppDispatch();
    const {id: stringId} = useParams(); 
    const id: number = stringId ? +stringId : 0

    return (
        <div className=' p-10'>
            {state && chatter._id
                ? (<div className='flex flex-col justify-between w-full'>
                        <Discussion />
                        <AddMessage />
                    </div>)
                : <span></span>
            }
        </div>
    )
}

export default Dialogs