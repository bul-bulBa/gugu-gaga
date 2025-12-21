import {useState} from 'react'
import { useAppDispatch, useAppState } from '../../../store/StoreConfig';
import { setValue, setEditMessage, getValue, getEditMessage} from '../../../store/reducers/addMessageSlice'
import { selectMessages } from '../../../store/reducers/allText';
import { newMessage, editMessage } from '../DialogsPage' 
import { Input } from 'antd';

const { TextArea } = Input;

const AddMessage = () => {
    const text = useAppState(selectMessages)
    const value = useAppState(getValue)
    const editMessageId = useAppState(getEditMessage)
    const dispatch = useAppDispatch()

    const addMessageFunc = () => {
        newMessage(value)
        dispatch(setValue(''))
    }

    const editMessageFunc = () => {
        editMessage(editMessageId, value)
        dispatch(setEditMessage(''))
        dispatch(setValue(''))
    }

    return (

        <div>
            <TextArea 
            style={{ border: 'none', boxShadow: 'none', outline: 'none', width: '90%' }}
            value={value}
            className='scrollbar-hide TextArea'
            placeholder={text.newMessagePlaceholder}
            autoSize 
            onChange={(e) => dispatch(setValue(e.target.value))}/>
            {!editMessageId
            ? <button className={`${!value ? 'disabled' : ''}`} onClick={addMessageFunc}>{text.send}</button>
            : <button className={`${!value ? 'disabled' : ''}`} onClick={editMessageFunc}>{text.save}</button>
            }
        </div>
    )
}

export default AddMessage