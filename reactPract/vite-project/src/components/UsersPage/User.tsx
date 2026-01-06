import defaultUserPhoto from '../../assets/userPhoto.webp'
import {NavLink} from 'react-router-dom'
import {userType} from '../../store/reducers/usersPageSlice'
import { useAppState } from '../../store/StoreConfig'
import { selectUsers } from '../../store/reducers/allText'
import { urlSlice } from '../../lib/urlSlice'

type propsType = {
    followFunc: (id: string)=> void,
    followed: boolean,
    user: userType
}

const User: React.FC<propsType> = ({followed, followFunc, user}) => {
    const text = useAppState(selectUsers)

    return (
        <div className="flex gap-2 items-center" key={user._id}>
        <NavLink to={'/profile/' + user._id}>
            <img className="rounded-full w-[50px] aspect-square object-cover" src={
                user.avatar !== '' ? urlSlice(user.avatar) : defaultUserPhoto
            } alt="NemaImg" /> 
        </NavLink>

        <div className="text-sm w-[200px] p-2 m-3 grid grid-cols-[1fr-50px] grid-rows-[1fr-1fr] gap-[10px] border-2 rounded-xl border-gray-300 
        sm:w-[300px] sm:text-base
        dark:border-stone-500">
            <span className="text-left row-start-1 col-start-1">{user.name}</span>
            <span className="text-left row-start-2 col-start-1 truncate">{user.about}</span>
            <span className="text-right row-start-1 col-start-2">{user.location.country}</span>
            <span className="text-right row-start-2 col-start-2">{user.location.city}</span>
        </div>
        
        {!followed
        ? <button onClick={() => followFunc(user._id)}>{text.follow}</button>
        : <button onClick={() => followFunc(user._id)}>{text.unFollow}</button>
        }
        </div>
    )
}

export default User