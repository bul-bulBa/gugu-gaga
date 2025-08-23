import '../../../App.css'

type propsType = {state: Array<string>}

const Discussion: React.FC<propsType> = ({state}) => {
    return (
    <div>
        {   
            <div className='flex flex-col items-start gap-[10%]'>
                {state.map( (m, index) => (
                    <div key={index}>{m}</div>
                ))}
            </div>
        }
    </div>
    )
}

export default Discussion
