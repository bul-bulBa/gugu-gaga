import defaultAvatar from '../../../assets/userPhoto.webp'

function ProfileDescription(props) {

    return (
        <div>
        <div>
          <img className="h-[200px] w-[100%]" 
          src={props.profilePhoto == '' 
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
    </div>
    )
}

export default ProfileDescription