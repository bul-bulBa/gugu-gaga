
function UISignIn(props) {

    return (
        <div className="flex justify-center items-center bg-gray-200">
            <div className="flex flex-col gap-3 p-3">
                <h1>SignIn</h1>

                <div>
                    <input value={props.form.name} type="text" placeholder={props.form.namePlaceholder} onChange={e => props.updateForm('name', e.target.value)}/>
                </div>
                <div>
                    <input value={props.form.password} type="text" placeholder={props.form.passwordPlaceholder} onChange={e => props.updateForm('password', e.target.value)} />
                </div>
                <div>
                    <input value={props.form.country} type="text" placeholder={props.form.countryPlaceholder} onChange={e => props.updateForm('country', e.target.value)} />
                </div>
                <div>
                    <input value={props.form.city} type="text" placeholder={props.form.cityPlaceholder} onChange={e => props.updateForm('city', e.target.value)} />
                </div>
                <div>
                    <button onClick={() => props.authorize()}>SignIn</button>
                </div>
            </div>
        </div>
    )
}

export default UISignIn