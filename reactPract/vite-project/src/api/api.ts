import axios from 'axios'
import {actionLoginType, stateUserType, actionSingUpType} from '../store/reducers/authInfoSlice'
import {getUsersType} from '../store/reducers/usersPageSlice'
import {editProfileType} from '../store/reducers/profilePageSlice'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export const authorize = {
    login({name, password, captcha}: actionLoginType) {
        return request.post('/login', {name, password, captcha})
        .then((res): stateUserType => res.data)
    }, 
    logout() {
        return request.post('/logout')
    },
    signUp({name, password, country, city, captcha}: actionSingUpType) {
        return request.post('/profile', {
            name, 
            password, 
            location: {country, city},
            captcha
        })
        .then((res): stateUserType => res.data)
    }
}

export const getUsers = {
    getUsersCard({currentPage, limit}: getUsersType) {
        return request.get(`/users?page=${currentPage}&limit=${limit}`)
        .then(res => res.data)
    },
    getProfile(id: number) {
        return request.get(`/profile?user=${+id}`)
        .then(res => res.data)
    },
    toggleFollowing(id: number) {
        return request.put(`/toggleFollowing/${id}`)
        .then(res => res.data)
    }
}

export const changeProfile = {
    changeStatus(status: string) {
        return request.put('/changeStatus', {message: status})
        .then(res => res.data)
    },
    edit(values: editProfileType) {
        const formData = new FormData()
        if(values.avatar) formData.append('avatar', values.avatar)
        if(values.profilePhoto) formData.append('profilePhoto', values.profilePhoto)
        formData.append('about', values.about)

        return request.post('/edit', formData)
        .then(res => res.data)
    }
}