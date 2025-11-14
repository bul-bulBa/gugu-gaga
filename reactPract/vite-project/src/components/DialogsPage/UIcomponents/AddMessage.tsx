import {useState} from 'react'
import { newMessage } from '../DialogsPage'


const AddMessage = () => {
    const [value, setValue] = useState<string>('')

    const addMessageFunc = () => {
        newMessage(value)
        setValue('')
    }

    return (

        <div>
            <textarea value={value} className='border rounded' name="textarea" onChange={(e) => setValue(e.target.value)}></textarea>
            {value.length > 0 && <button onClick={() => addMessageFunc()}>AddMessage</button>}
        </div>
    )
}

export default AddMessage