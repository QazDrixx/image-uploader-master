import '../scss/App.scss';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ImageLoading } from './ImageLoading/ImageLoading';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { useSendImage } from '../hooks/useSendImage';
import { useState } from 'react';
import { postFile } from '../services/postFile';
import { UploadError } from './uploadError/uploadError';
import Layout from './Layout/Layout';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {

    const [imageData, setImageData] = useState();
    const [handleSendingImage, uploadStage] = useSendImage();
    const navigate = useNavigate()

    const sendImage = async (image) => {
        handleSendingImage(async () => {
            const response = await postFile(image);
            setImageData(response.data);
            navigate(`image/${response.data['filename']}`)
        });
    };

    return (
        <>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={uploadStage.isLoading?<ImageLoading />:<ImageUploader sendImage={sendImage}/>} />
                <Route path='image/:imageName' element={<ImagePreview imageData={imageData} />}/>
                <Route path='error' element={<UploadError />}/>
            </Route>
        </Routes>  
        </>
    );
}

export default App;
