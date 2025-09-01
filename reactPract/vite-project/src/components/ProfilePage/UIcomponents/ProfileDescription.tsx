import defaultAvatar from '../../../assets/userPhoto.webp'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

type propsType = {
  itIsMe: boolean,
  name: string,
  about: string,
  avatar: string,
  profilePhoto: string,
  status: string,
  country: string,
  city: string,
  changeStatus: (text: string) => void
}

let statusSpan: React.ReactElement
let avatarImg

const ProfileDescription: React.FC<propsType> = (props) => {
    const navigate = useNavigate()
    const [showInput, setShowInput] = useState<boolean>(false)
    const [status, setStatuts] = useState<string>(props.status)

    function changeStatus(): void {
      props.changeStatus(status)
      setShowInput(false)
    } 

    if(props.itIsMe) {
      statusSpan = showInput 
            ? ( <input value={status} onChange={(e) => setStatuts(e.target.value)} onBlur={() => changeStatus()} autoFocus type="text" />)
            : (<span  onDoubleClick={() => setShowInput(true)}>{props.status || 'set status'}</span>)   
          
    } else {
      statusSpan = <span>{props.status}</span>
    }

    return (
      <div className='relative'>
        <div>
          <img className="h-[200px] w-[100%] rounded-xl" 
          src={!props.profilePhoto
          ? "https://euc.yorku.ca/wp-content/uploads/2020/08/main-1.jpg" 
          : props.profilePhoto
          }
          alt="Nema Fotochki" />
        </div>

        <div className="p-4 flex justify start items-center gap-10">

            <span>
              <img className="rounded-full w-[150px] h-[150px] " 
              src={props.avatar == ''
                ? defaultAvatar
                : props.avatar
              }
              alt="Nema Fotochki" />
              {avatarImg}
            </span>
            <div className='flex flex-col justify-end items-start gap-2'>
              <span>{props.name}</span>

              <span>{props.about}</span>
            </div>
        </div>

        <div className='flex flex-col gap-1 items-start'>
          <span>Country:{props.country}</span>
          <span>City:{props.city}</span>
        </div>

        <div>
          {statusSpan}
        </div>
        <div className='sticky bottom-1 right-1 z-2'>
        </div>
    </div>
    )
}

export default ProfileDescription