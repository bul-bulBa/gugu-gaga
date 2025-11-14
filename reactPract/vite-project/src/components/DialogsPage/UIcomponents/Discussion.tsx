import '../../../App.css'
import {dialogsUserType, selectChatter} from '../../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../../store/StoreConfig'
import {selectAuthId} from '../../../store/reducers/authInfoSlice'
import {selectUser} from '../../../store/reducers/profilePageSlice'
import Message from './Message'

type propsType = {state: Array<dialogsUserType>}

const Discussion = ({state}: propsType) => {
    // const {name, avatar} = useAppState(selectChatter)
    const user = useAppState(selectUser)
    const id = useAppState(selectAuthId)

    return (
        <div className='flex flex-col gap-[10%] h-[500px] overflow-y-auto scrollbar-hide w-full'>

            {state.map( (m, index) => {
                
                const message = m.writerId === id
                ? <Message text={m.text} key={index} position={'right'} date={'14:20'}/>
                : <Message text={m.text} key={index} position={'left'} date={'14:20'}/>
                return message
            })}

        </div>
    )
}

export default Discussion
