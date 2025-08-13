import defaultUserPhoto from '../../assets/userPhoto.webp'
import {NavLink} from 'react-router-dom'

function User(props) {
    
    let users = props.users.map(u => (
        <div className="flex gap-2 items-center" key={u.id}>
        <NavLink to={'/profile/' + u.id}>
            <img className="rounded-full w-[50px] h-[50px]" src={
                u.avatar !== '' ? u.avatar : defaultUserPhoto
            } alt="NemaImg" />
        </NavLink>

        <div className="w-[300px] p-2 m-3 grid grid-cols-[250px-50px] grid-rows-[1fr-1fr] gap-[10px] border-2 rounded-xl border-gray-300 ">
            <span className="text-left row-start-1 col-start-1">{u.fullName}</span>
            <span className="text-left row-start-2 col-start-1">{u.about}</span>
            <span className="text-right row-start-1 col-start-2">{u.location.country}</span>
            <span className="text-right row-start-2 col-start-2">{u.location.city}</span>
        </div>
        
        {props.followeUsersArr.find(num => num === u.id) === undefined
        ? <button onClick={() => props.followFunc(u.id)}>Follow</button>
        : <button onClick={() => props.followFunc(u.id)}>Unfollow</button>
        }
        </div>
    ))
    
    let arr = []
    for(let i = 1; i <= props.allPages; i++){
        arr.push(
        <button 
        key={i} 
        className={i == props.currentPage ? "activePaginationButton" : ''}
        onClick={i == props.currentPage ? null : e => props.getFunc(e.target.textContent)}>{i}
        </button>)
    }

    return (
        <div className="flex flex-col justify-between items-center h-full">
            <div>
                <h1>Users</h1>

                <div>
                    {users}
                </div>
            </div>

            
            <div className='flex justify-center'>
                {arr}
            </div>
            
            {/* <button onClick={e => props.getFunc(e.target.value)}>ShowMore</button> */}
        </div>
    )
}

export default User