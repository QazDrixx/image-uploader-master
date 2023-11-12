import axios from "axios";


const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://127.0.0.1:4444/'

const imageUploaderApi = axios.create({
    baseURL:BACKEND_API_URL,
    validateStatus: (status) => status < 500 && status !== 401,
    withCredentials:true,
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

export const postFile = async (files) => {
    const formData = new FormData();
    for (let file of files) {
        formData.append('image', file)
    }

    return await imageUploaderApi.post('images/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8;',
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

export const logout = async () => {
    return await imageUploaderApi.get('/logout')
}

imageUploaderApi.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken') || ''
    return config
})

imageUploaderApi.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true
        try {
            const newToken = await imageUploaderApi.get('/refresh')
            localStorage.setItem('accessToken', newToken.data.accessToken)  
            return await imageUploaderApi.request(originalRequest)
        } catch (error) {
            console.log('Unauthorized user');
        }
    }
})