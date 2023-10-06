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

imageUploaderApi.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token') || ''
    return config
})