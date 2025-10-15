import axios from 'axios'
import {actionLoginType, stateUserType, actionSignUpType} from '../store/reducers/authInfoSlice'
import {getUsersType, resultUsersType, autoComplType} from '../store/reducers/usersPageSlice'
import {editProfileType, userType} from '../store/reducers/profilePageSlice'

export const PORT = 'http://localhost:5000/api'

const request = axios.create({
    baseURL: PORT,
    withCredentials: true
})

export const authorize = {
    login({email, password, captcha}: actionLoginType) {
        return request.post('/login', {email, password, captcha})
        .then((res): string => res.data)
    },
    autoLogin() {
        return request.post('/autoLogin').then((res): stateUserType => res.data)
    }, 
    logout() {
        return request.post('/login')
    },
    signUp({email, name, password, country, city, captcha}: actionSignUpType) {
        return request.post('/registration', {
            email,
            name, 
            password, 
            location: {country, city},
            captcha
        })
        .then((res): string => res.data)
    },
    delete() {
        return request.delete('/registration')
    },
    getCode(email: string) {
        return request.post('/verifyAccount', {email})
    },
    verifyCode({email, code}: {email: string, code: string}) {
        return request.post('/confirmVerification', {email, code})
        .then((res): stateUserType => res.data)
    }
}

export const getUsers = {
    getUsersCard({currentPage, limit, term, friends}: getUsersType) {
        return request.get(`/users?page=${currentPage}&limit=${limit}&term=${term}&friends=${friends}`)
        .then((res): resultUsersType => res.data)
    },
    getAutoCompNames(value: string) {
        return request.get(`/usersAutocomplete/${value}`)
        .then((res): autoComplType[] => res.data)
    },
    getProfile(id: string) {
        return request.get(`/profile/${id}`)
        .then((res): userType => res.data)
    },
    toggleFollowing(id: number) {
        return request.put(`/toggleFollowing/${id}`)
        .then((res): Array<number> => res.data)
    }
}

export const changeProfile = {
    changeStatus(status: string) {
        return request.put('/changeStatus', {text: status})
        .then((res): string => res.data)
    },
    edit(values: editProfileType) {
        const formData = new FormData()
        if(values.avatar) formData.append('avatar', values.avatar)
        if(values.profilePhoto) formData.append('profilePhoto', values.profilePhoto)
        formData.append('about', values.about)

        return request.put('/edit', formData)
        .then((res): void => res.data)
    }
}