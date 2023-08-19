import axios from 'axios';

export const postFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return await axios.post('https://image-uploader-api-lpkb.onrender.com', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
