import axios from 'axios';

export const postFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return await axios.post('http://127.0.0.1:4444/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
