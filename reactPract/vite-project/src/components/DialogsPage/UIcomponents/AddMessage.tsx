import {Formik, Form, Field, ErrorMessage} from 'formik'

type propsType = {
    add: (message: string) => void | object
}
type messageType = {message: string}

const AddMessage: React.FC<propsType> = (props) => {
    let initialValues: messageType = {message: ''}
    return (
        <div>
            {/* <input value={props.state} type="text" onChange={e => props.change(e.target.value)} className='border rounded'/> 
            <button onClick={ () => props.add() }>Send</button> */}
            <Formik
            initialValues={initialValues}
            validate={values => {
                values.message.length > 100
                ? {message: 'Досягнений ліміт символів'}
                : {}
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