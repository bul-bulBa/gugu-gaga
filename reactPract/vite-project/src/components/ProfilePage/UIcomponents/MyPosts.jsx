import '../../../App.css';

function MyPosts(props) {

    return (
        <div className='flex flex-col items-start'>


            <div className='flex flex-col items-start'>

              <span>
                <input value={props.state} type="text" className='border rounded' onChange={(e) => {
                  props.changeInput(e.target.value)} }/>
                  
                {props.isValid 
                ? <button onClick={() => props.addPosts() }>Submit</button>
                : <button className="warning">Submit</button>
                }
              </span>
            </div>

        </div>
    )
}

export default MyPosts