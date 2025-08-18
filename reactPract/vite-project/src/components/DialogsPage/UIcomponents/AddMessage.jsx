import {Formik, Form, Field, ErrorMessage} from 'formik'

function AddMessage(props) {
    return (
        <div>

            {/* <input value={props.state} type="text" onChange={e => props.change(e.target.value)} className='border rounded'/> 
            <button onClick={ () => props.add() }>Send</button> */}

            <Formik
            initialValues={{message: ''}}
            validate={values => {
                const error=''
                if(values.message > 100) error = 'Досягнений ліміт символів'
                return error
            }}
            onSubmit={(values, {resetForm}) => {
                props.add(values.message)
                resetForm()
            }}
            >
                {({values}) => (
                    <Form>
                    <Field name='message' placeholder='message'/>
                    <ErrorMessage name='message' component='div' className='text-red-200' />

                    {values.message.length >= 1 && (
                        <button type='submit'>Submit</button>
                    )}
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddMessage