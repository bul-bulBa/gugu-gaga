
function AddMessage(props) {
    return (
        <div>

            <input value={props.state} type="text" onChange={e => props.change(e.target.value)} className='border rounded'/> 
            <button onClick={ () => props.add() }>Send</button>

        </div>
    )
}

export default AddMessage