import {useState, useEffect} from 'react'
import {Input, Button} from 'antd'
import { useAppDispatch, useAppState } from '../store/StoreConfig'
import { getCodeThunk, verifyCodeThunk, selectError, setError } from '../store/reducers/authInfoSlice' 

const InputCode = () => {
    const dispatch = useAppDispatch()
    const email = useAppState((state) => state.auth.email)
    const error = useAppState(selectError)
    const [otp, setOtp] = useState<string>()

    const getCodeFunc = () => dispatch(getCodeThunk(email))
    const verifyCodeFunc = () => {
        if(!otp) return dispatch(setError('enter the code'))
        dispatch(verifyCodeThunk({email, code: otp}))
    }

    useEffect(() => { getCodeFunc() }, [])

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col gap-5'>
                <p>Verify your account</p>
                    <Input.OTP
                    value={otp}
                    onChange={(val) => setOtp(val.replace(/\D/g, '').slice(0, 6))}
                    formatter={(val) => val.replace(/\D/g, '')}
                    inputMode="numeric"
                />

                <Button type='primary' onClick={verifyCodeFunc}>Verify</Button>
                <Button type='text' onClick={getCodeFunc}>Resend Code</Button>

                <div>{error}</div>
            </div>
        </div>
    )
}

export default InputCode