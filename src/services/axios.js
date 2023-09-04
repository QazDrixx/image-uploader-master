import axios from "axios";

const imageUploaderApi = axios.create({
    baseURL:'http://127.0.0.1:4444/',
    validateStatus: (status) => status < 500
})

export const login = async (userData, isRegistration=false) => {
    const url = isRegistration?'registration/':'login/'
    const data = JSON.stringify(userData)
    return await imageUploaderApi.post(url, data, {
        headers: {
            "Content-Type":	'application/json; charset=utf-8'
        },
    })
}

export const getUser = async () => {
    return await imageUploaderApi.get('getUser/')
}

imageUploaderApi.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
})