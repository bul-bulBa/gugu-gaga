
function UILogin(props) {

    return (
        <div>
            <h1>Log In</h1>

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