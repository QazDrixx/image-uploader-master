import '../scss/App.scss';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ImageLoading } from './ImageLoading/ImageLoading';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { useSendImage } from './hooks/useSendImage';
import { useState } from 'react';
import { postFile } from './services/postFile';
import { UploadError } from './uploadError/uploadError';
import { CreatedBy } from './UI/CreatedBy/CreatedBy';

function App() {
    const preventDefaultDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
    };
    const [imageUrl, setImageUrl] = useState('');
    const [handleSendingImage, uploadStage, goHome] = useSendImage();

    const sendImage = async (image) => {
        handleSendingImage(async () => {
            const response = await postFile(image);
            setImageUrl(response.data);
        });
    };


    return (
        <div
            className="App"
            onDrop={preventDefaultDrop}
            onDragOver={preventDefaultDrop}
        >

        <div className='Components'>
            {uploadStage.isUploader && <ImageUploader sendImage={sendImage} />}
            {uploadStage.isLoading && <ImageLoading />}
            {uploadStage.isPreview && <ImagePreview imageUrl={imageUrl} />}
            {uploadStage.error && <UploadError goHome={goHome}/>}
        </div>
            <CreatedBy/>
        </div>
    );
}

export default App;
