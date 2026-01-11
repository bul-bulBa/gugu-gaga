import {useState} from 'react'
import { LeftOutlined } from '@ant-design/icons'
import Discussion from './UIcomponents/Discussion'
import AddMessage from './UIcomponents/AddMessage'
import {useParams} from 'react-router-dom'
import { selectDialogs, dialogsMessageType, selectChatter, setChatter } from '../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'
import { useGetUsers } from '../../lib/useGetUsers'

const Dialogs = () => {
    const state = useAppState(selectDialogs)
    const { userA, userB } = useGetUsers()
    const dispatch = useAppDispatch();
    const {id: stringId} = useParams(); 
    const id: number = stringId ? +stringId : 0

    return (
        <div className='w-full h-full min-h-0'>
            {state && userB
                ? (
                <div className='grid grid-cols-[10px_1fr] grid-rows-[10px_1fr] h-full min-h-0'>
                    <div className='col-start-1 row-start-1' onClick={() => dispatch(setChatter(''))}><LeftOutlined /></div>
                    <div className='flex flex-col justify-between w-full col-start-2 row-start-1 row-span-2 min-h-0 h-full'>
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