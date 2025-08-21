import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export const authorize = {
    login(name, password, captcha) {
        return request.post('/login', {name, password, captcha})
        .then(res => res.data)
    }, 
    logout() {
        return request.post('/logout')
    },
    signUp(name, password, country, city, captcha) {
        return request.post('/profile', {
            name, 
            password, 
            location: {country, city},
            captcha
        })
        .then(res => res.data)
    }
}

export const getUsers = {
    getUsersCard(currentPage = 1, limit = 4) {
        return request.get(`/users?page=${currentPage}&limit=${limit}`)
        .then(res => res.data)
    },
    getProfile(id) {
        return request.get(`/profile?user=${+id}`)
        .then(res => res.data)
    },
    toggleFollowing(id,) {
        return request.put(`/toggleFollowing/${id}`)
        .then(res => res.data)
    }
}

export const changeProfile = {
    changeStatus(value) {
        return request.put('/changeStatus', {message: value})
        .then(res => res.data)
    },
    edit(values) {
        const formData = new FormData()
        formData.append('avatar', values.avatar)
        formData.append('profilePhoto', values.profilePhoto)
        formData.append('about', values.about)

        return request.post('/edit', formData)
        .then(res => res.data)
    }
}