import { useAppDispatch, useAppState } from '../../../store/StoreConfig';
import { setValue, setEditMessage, getValue, getEditMessage} from '../../../store/reducers/addMessageSlice'
import { selectMessages } from '../../../store/reducers/allText';
import { apiWS } from '../../../api/apiWS';
import { useGetUsers } from '../../../lib/useGetUsers';
import { Input } from 'antd';

const { TextArea } = Input;

const AddMessage = () => {
    const text = useAppState(selectMessages)
    const { userA, userB } = useGetUsers()
    const value = useAppState(getValue)
    const editMessageId = useAppState(getEditMessage)
    const dispatch = useAppDispatch()

    const addMessageFunc = () => {
        apiWS.newMessage(value, userA, userB)
        dispatch(setValue(''))
    }

    const editMessageFunc = () => {
        apiWS.editMessage(editMessageId, value, userB)
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