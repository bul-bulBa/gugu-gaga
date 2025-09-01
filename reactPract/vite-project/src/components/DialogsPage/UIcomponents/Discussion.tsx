import '../../../App.css'
import Message from './Message'

type propsType = {state: Array<string>}

const Discussion = ({state}: propsType) => {
    return (
        <div className='flex flex-col items-start gap-[10%] h-[500px] overflow-y-auto min-w-full'>

            {state.map( (m, index) => (
                <Message text={m} key={index} name={'Vasya'} date={'14:20'}/>
            ))}

        </div>
    )
}

export default Discussion
