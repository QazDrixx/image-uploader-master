import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSendImage = () => {
    const [uploadStage, setUploadStage] = useState({
        isLoading: false,
        error: false,
    });

    const navigate = useNavigate()

    const handleSendingImage = async (callback) => {
        try {
            setUploadStage((uploadStage) => ({...uploadStage, isLoading: true}));
            await callback();
            // navigate()
        
        } catch (error) {
            setUploadStage((uploadStage) => ({...uploadStage, error: error}));
            navigate('/error')
            throw(error)

        } finally {
            setUploadStage((uploadStage) => ({...uploadStage, isLoading: false}));
        }
    };

    return [handleSendingImage, uploadStage];
};

