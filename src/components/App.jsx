import '../scss/App.scss';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ImageView } from './ImageView/ImageView';
import { UserRegistration } from './UserRegistration/UserRegistration';
import { UploadError } from './uploadError/uploadError';
import { Layout } from './Layout/Layout';
import { Route, Routes} from 'react-router-dom';
import { UserLogin } from './UserLogin/UserLogin';
import { useFetchUser } from '../hooks/useFetchUser';
import { AllImages } from './AllImages/AllImages';
import { MultipleUploaded } from './UI/MultipleUploaded/MultipleUploaded';


function App() {

    useFetchUser()

    return (
        <>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<ImageUploader/>} />
                <Route path='/registration' element={<UserRegistration />}/>
                <Route path='/login' element={<UserLogin/> }/>
                <Route path='image/:imageId' element={<ImageView />}/>
                <Route path='/allImages' element={<AllImages />}/>
                <Route path='/multipleUploaded' element={<MultipleUploaded />}/>
                <Route path='error' element={<UploadError />}/>
            </Route>
        </Routes>  
        </>
    );
}

export default App;
