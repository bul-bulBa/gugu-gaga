import {useState} from 'react'
import '../../App.css'
import Discussion from './UIcomponents/Discussion'
import AddMessage from './UIcomponents/AddMessage'
import {useParams} from 'react-router-dom'
import { selectDialogs, dialogsMessageType} from '../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'


const Dialogs = () => {
    const state = useAppState(selectDialogs)
    const dispatch = useAppDispatch();
    const {id: stringId} = useParams(); 
    const id: number = stringId ? +stringId : 0

    return (
        <div className=' p-10'>
            {state
                ? (<div className='flex flex-col justify-between w-full'>
                        <Discussion state={state}/>
                        <AddMessage />
                    </div>)
                : <span></span>
            }
        </div>
    )
}

export default Dialogs