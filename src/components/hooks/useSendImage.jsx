import {useState } from 'react';

export const useSendImage = () => {
    const [uploadStage, setUploadStage] = useState({
        isUploader: true,
        isLoading: false,
        isPreview: false,
        error: false,
    });


    const handleSendingImage = async (callback) => {
        try {
            setUploadStage((uploadStage) => ({...uploadStage, isLoading: true, isUploader: false}));
            await callback();
        
        } catch (error) {
            setUploadStage((uploadStage) => ({...uploadStage, error: error}));

        } finally {
            setUploadStage((uploadStage) => ({...uploadStage, isLoading: false, isPreview:uploadStage.error?false:true}));
        }
    };

    const goHome = () => {
        setUploadStage((uploadStage) => ({...uploadStage, isUploader:true, error:false, isPreview:false}))
    }

    return [handleSendingImage, uploadStage, goHome];
};

