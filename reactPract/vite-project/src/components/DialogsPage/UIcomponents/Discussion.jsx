import '../../../App.css'

function Discussion(props) {
    return (
    <div>
        {   
            <div className='flex flex-col items-start gap-[10%]'>
                {props.state.map( (m, index) => (
                    <div key={index}>{m}</div>
                ))}
            </div>
        }
    </div>
    )
}

export default Discussion
