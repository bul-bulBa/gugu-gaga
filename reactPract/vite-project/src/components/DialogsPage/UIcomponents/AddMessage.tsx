import {useState} from 'react'

type propsType = {
    add: (message: string) => void
}

const AddMessage = (props: propsType) => {
    const [value, setValue] = useState<string>('')

    const addMessageFunc = () => {
        props.add(value)
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