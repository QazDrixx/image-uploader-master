import axios from 'axios';

export const postFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return await axios.post('127.0.0.1:5000', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
