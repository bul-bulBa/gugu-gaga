import {useState} from 'react'
import '../../App.css'
import { LeftOutlined } from '@ant-design/icons'
import Discussion from './UIcomponents/Discussion'
import AddMessage from './UIcomponents/AddMessage'
import {useParams} from 'react-router-dom'
import { selectDialogs, dialogsMessageType, selectChatter, setChatter } from '../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'


const Dialogs = () => {
    const state = useAppState(selectDialogs)
    const chatter = useAppState(selectChatter)
    const dispatch = useAppDispatch();
    const {id: stringId} = useParams(); 
    const id: number = stringId ? +stringId : 0

    return (
        <div className='w-full md:p-10'>
            {state && chatter._id
                ? (
                <div className='grid grid-cols[20px_1fr] grid-rows[20px_1fr]'>
                    <div className='col-start-1 row-start-1' onClick={() => dispatch(setChatter(''))}><LeftOutlined /></div>
                    <div className='flex flex-col justify-between w-full col-start-2 row-start-1 row-span-2'>
                        <Discussion />
                        <AddMessage />
                    </div>
                </div>
                )
                : <span></span>
            }
        </div>
    )
}

export default Dialogs