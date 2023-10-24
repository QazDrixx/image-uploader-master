import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4444/'

const imageUploaderApi = axios.create({
    baseURL:API_URL,
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

export const postFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return await imageUploaderApi.post('images/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getOneImage = async (imageId) => {
    return await imageUploaderApi.get(`images/${imageId}`)
}

export const getAllImages = async () => {
    return await imageUploaderApi.get('images/')
}

export const deleteImage = async (imageId) => {
    return await imageUploaderApi.delete(`/images/${imageId}`)
}

export const updateImage = async (imageId, dataToUpdate) => {
    return await imageUploaderApi.patch(`/images/${imageId}`, dataToUpdate)
}

imageUploaderApi.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
})