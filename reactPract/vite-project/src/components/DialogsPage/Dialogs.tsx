import {useState} from 'react'
import '../../App.css'
import Discussion from './UIcomponents/Discussion'
import AddMessage from './UIcomponents/AddMessage'
import {useParams} from 'react-router-dom'
import { selectDialogs, dialogsUserType} from '../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../store/StoreConfig'


const Dialogs = () => {
    const state = useAppState(selectDialogs)
    const dispatch = useAppDispatch();
    const {id: stringId} = useParams(); 
    const id: number = stringId ? +stringId : 0

    // const certainUser: dialogsUserType | undefined = state.find(u => u.id == id)
    
    
    // const change = (text: string) => dispatch(changeMessageDraft({id, message: text}))
    // const add = (message: string) => dispatch(addMessage({id, message}))
    console.log(state)
    console.log('updated')
    return (
        <div className='flex gap-[15%] p-10'>
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