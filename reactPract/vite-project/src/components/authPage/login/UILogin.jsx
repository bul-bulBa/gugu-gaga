
function UILogin(props) {

    return (
        <div>
            <h1>Log In</h1>

            {props.error == "Request failed with status code 401"
            ? <div>Не вірний логін або пароль</div> 
            : <span></span>
            }
            <div>
                <div>
                    <input value={props.name} type="text" placeholder="Name" onChange={e => props.setName(e.target.value)}/>
                </div>
                <div>
                    <input value={props.password} type="text" placeholder="Password" onChange={e => props.setPassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={() => props.login()}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default UILogin