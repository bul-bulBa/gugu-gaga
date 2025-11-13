import '../../../App.css'
import {dialogsUserType} from '../../../store/reducers/dialogsPageSlice'
import Message from './Message'

type propsType = {state: Array<dialogsUserType>}

const Discussion = ({state}: propsType) => {
    console.log(state)
    return (
        <div className='flex flex-col items-start gap-[10%] h-[500px] overflow-y-auto min-w-full'>

            {state.map( (m, index) => (
                <Message text={m.text} key={index} name={'Vasya'} date={'14:20'}/>
            ))}

        </div>
    )
}

export default Discussion
