import '../scss/App.scss';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ImageLoading } from './ImageLoading/ImageLoading';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { useSendImage } from '../hooks/useSendImage';
import { useState } from 'react';
import { postFile } from '../services/postFile';
import { UploadError } from './uploadError/uploadError';
import { CreatedBy } from './UI/CreatedBy/CreatedBy';
import { NavBar } from './NavBar/NavBar';


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
        <div className="App" onDrop={preventDefaultDrop} onDragOver={preventDefaultDrop}>
        
            <header>
                <NavBar/>
            </header>

            <main className='Main'>
                {uploadStage.isUploader && <ImageUploader sendImage={sendImage} />}
                {uploadStage.isLoading && <ImageLoading />}
                {uploadStage.isPreview && <ImagePreview imageUrl={imageUrl} />}
                {uploadStage.error && <UploadError goHome={goHome}/>}
            </main>

            <footer className='Footer'>
                <CreatedBy/>
            </footer>
            
        </div>
    );
}

export default App;
