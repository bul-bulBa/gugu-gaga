import defaultUserPhoto from '../../assets/userPhoto.webp'
import {NavLink} from 'react-router-dom'
import {userType} from '../../store/reducers/usersPageSlice'

type propsType = {
    followFunc: (id: string)=> void,
    followed: boolean,
    user: userType
}

const User: React.FC<propsType> = ({followed, followFunc, user}) => {

    return (
        <div className="flex gap-2 items-center" key={user._id}>
        <NavLink to={'/profile/' + user._id}>
            <img className="rounded-full w-[50px] h-[50px]" src={
                user.avatar !== '' ? user.avatar : defaultUserPhoto
            } alt="NemaImg" /> 
        </NavLink>

        <div className="text-sm w-[200px] p-2 m-3 grid grid-cols-[1fr-50px] grid-rows-[1fr-1fr] gap-[10px] border-2 rounded-xl border-gray-300 
        sm:w-[300px] sm:text-base">
            <span className="text-left row-start-1 col-start-1">{user.name}</span>
            <span className="text-left row-start-2 col-start-1">{user.about}</span>
            <span className="text-right row-start-1 col-start-2">{user.location.country}</span>
            <span className="text-right row-start-2 col-start-2">{user.location.city}</span>
        </div>
        
        {!followed
        ? <button onClick={() => followFunc(user._id)}>Follow</button>
        : <button onClick={() => followFunc(user._id)}>Unfollow</button>
        }
        </div>
    )
}

export default User