import {useState} from 'react'
import '../../App.css'
import Discussion from './UIcomponents/Discussion'
import AddMessage from './UIcomponents/AddMessage'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addMessage, changeMessageDraft, selectDialogs} from '../../store/reducers/dialogsPageSlice'


function Dialogs(props) {
    const state = useSelector(selectDialogs)
    const dispatch = useDispatch();
    const {id} = useParams();

    const certainUser = state.find(u => u.id == +id)
    
    
    const change = (text) => dispatch(changeMessageDraft({id: +id, message: text}))
    const add = (message) => dispatch(addMessage({id: +id, message}))

    return (
        <div className='flex gap-[15%] p-10'>
            <div className='flex flex-col justify-between w-full'>
                <Discussion state={certainUser.mes}/>
                <AddMessage state={certainUser.draft} change={change} add={add}/>
            </div>
        </div>
    )
}

export default Dialogs