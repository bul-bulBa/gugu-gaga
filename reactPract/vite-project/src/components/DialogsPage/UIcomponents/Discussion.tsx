import '../../../App.css'
import {dialogsMessageType, selectChatter} from '../../../store/reducers/dialogsPageSlice'
import {useAppState, useAppDispatch} from '../../../store/StoreConfig'
import {selectAuthId} from '../../../store/reducers/authInfoSlice'
import {selectUser} from '../../../store/reducers/profilePageSlice'
import Message from './Message'

type propsType = {state: Array<dialogsMessageType>}

const Discussion = ({state}: propsType) => {
    // const {name, avatar} = useAppState(selectChatter)
    const user = useAppState(selectUser)
    const id = useAppState(selectAuthId)

    return (
        <div className='flex flex-col gap-[10%] h-[500px] overflow-y-auto scrollbar-hide w-full'>

            {state.map(m => {
                const time = new Date(m.updatedAt).toTimeString().slice(0, 5)
                const message = m.writerId === id
                ? <Message key={m._id} position={'right'} message={m} date={time} />
                : <Message key={m._id} position={'left'} message={m} date={time}/>
                return message
            })}

        </div>
    )
}

export default Discussion
