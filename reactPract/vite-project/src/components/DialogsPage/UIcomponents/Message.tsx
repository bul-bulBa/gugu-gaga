import userPhoto from '../../../assets/userPhoto.webp'

const Message = (props: any) => {

    return (
        <div className="flex gap-1 m-2">
            
            {!props.img && <img className="w-[50px] h-[50px] rounded-full" src={userPhoto} alt="avatar" /> ||
            <img className="w-[50px] h-[50px] rounded-full" src={props.img}/>}

            <div className="bg-gray-100 rounded-xl grid grid-rows-[20px_1fr_20px] max-w-3/5 min-w-[130px] p-2">
                <div className="row-start-1 flex justify-start">{props.name}</div>
                <div className="row-start-2 flex text-left"> {props.text} </div>
                <span className="text-xs row-start-3 flex justify-end"> {props.date} </span>
            </div>
        </div>
    )
}
export default Message