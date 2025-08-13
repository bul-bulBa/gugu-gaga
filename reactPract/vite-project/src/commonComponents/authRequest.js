import axios from 'axios'
import {setProfile, setProfileAC} from '../store/reducers/authInfoSlice'

const authRecuest = (name, password, dispatch, navigate) => {
    
    axios.post('http://localhost:3000/login', {name, password}, {withCredentials: true})
    .then(data => {
        dispatch(setProfile(setProfileAC(data)))
    })
    .then(() => navigate ? navigate('/profile') : console.log('nema takogo'))
    .catch(err => {
        if(err.response) {
            if (err.response.status === 401) {
                alert('Не вірний логін або пароль, або всьо зразу');
            }
        } else {
            alert('якісь проблєми, я хз шо не так')
        }
    })
}

export default authRecuest