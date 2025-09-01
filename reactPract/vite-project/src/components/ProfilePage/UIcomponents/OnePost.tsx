import {postType} from '../../../store/reducers/profilePageSlice'

type propsType = {
    posts: postType[]
}

const OnePost: React.FC<propsType> = (props) => {
    console.log(props)
    return (
        <div className="p-5 whitespace-normal break-words w-full">

            {props.posts.map(m => (

            <div className='flex flex-col items-start text-left' key={m.id}>
                <img className='rounded-xl w-[30px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqFEL0MCpXSpz4eTeKzbZXmk2Mepd4p5kgA&s" alt="" />
                {m.message}
                <div className='pl-[10px]'>
                    likes: {m.likesCount}
                </div>
            </div>

            ))}

        </div>
    )
}

export default OnePost