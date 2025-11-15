import {useState} from 'react'
import { newMessage } from '../DialogsPage'
import { Input } from 'antd';

const { TextArea } = Input;

const AddMessage = () => {
    const [value, setValue] = useState<string>('')

    const addMessageFunc = () => {
        newMessage(value)
        setValue('')
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
            onChange={(e) => setValue(e.target.value)}/>
            {!value
            ? <button style={{color: '#a8a29e', borderColor: '#a8a29e'}} >Send</button>
            : <button onClick={addMessageFunc}>Send</button>}
        </div>
    )
}

export default AddMessage