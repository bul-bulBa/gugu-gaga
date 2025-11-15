import {useState} from 'react'
import { useAppDispatch, useAppState } from '../../../store/StoreConfig';
import { setValue, setEditMessage, getValue, getEditMessage} from '../../../store/reducers/addMessageSlice'
import { newMessage, editMessage } from '../DialogsPage' 
import { Input } from 'antd';

const { TextArea } = Input;

const AddMessage = () => {
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
            {/* <textarea value={value} className='border rounded' name="textarea" onChange={(e) => setValue(e.target.value)}></textarea>
            {value.length > 0 && <button onClick={() => addMessageFunc()}>AddMessage</button>} */}

            <TextArea 
            style={{ border: 'none', boxShadow: 'none', outline: 'none', width: '90%' }}
            value={value}
            className='scrollbar-hide'
            placeholder="What's happening?" 
            autoSize 
            onChange={(e) => dispatch(setValue(e.target.value))}/>
            {!editMessageId
            ? <button className={`${!value ? 'disabled' : ''}`} onClick={addMessageFunc}>Send</button>
            : <button className={`${!value ? 'disabled' : ''}`} onClick={editMessageFunc}>Save</button>
            }
        </div>
    )
}

export default AddMessage