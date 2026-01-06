import {useState, useEffect} from 'react'
import {Input, Button} from 'antd'
import { useAppDispatch, useAppState } from '../store/StoreConfig'
import { getCodeThunk, verifyCodeThunk, selectError, setError } from '../store/reducers/authInfoSlice' 
import { selectAuthorization } from '../store/reducers/allText'

const InputCode = () => {
    const text = useAppState(selectAuthorization)
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
                <p>{text.verifyTitle}</p>
                    <Input.OTP
                    value={otp}
                    onChange={(val) => setOtp(val.replace(/\D/g, '').slice(0, 6))}
                    formatter={(val) => val.replace(/\D/g, '')}
                    inputMode="numeric"
                />

                <button onClick={verifyCodeFunc}>{text.verify}</button>
                <button onClick={getCodeFunc}>{text.resendCode}</button>

                {error === 'Request failed with status code 400' && <div className='text-red-300'>{text.verifyAccountError}</div>}
                    {error !== 'Request failed with status code 400'
                    && error && <div className='text-red-300'>{text.somethingWentWrong}</div>}
            </div>
        </div>
    )
}

export default InputCode