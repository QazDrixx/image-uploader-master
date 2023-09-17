import '../scss/App.scss';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { UserRegistration } from './UserRegistration/UserRegistration';
import { UploadError } from './uploadError/uploadError';
import { Layout } from './Layout/Layout';
import { Route, Routes} from 'react-router-dom';
import { UserLogin } from './UserLogin/UserLogin';
import { useFetchUser } from '../hooks/useFetchUser';


function App() {

    useFetchUser()

    return (
        <>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<ImageUploader/>} />

                <Route path='/registration' element={<UserRegistration/>} />
                <Route path='/login' element={<UserLogin/> }/>
                <Route path='image/:imageId' element={<ImagePreview />}/>
                <Route path='error' element={<UploadError />}/>
            </Route>
        </Routes>  
        </>
    );
}

export default App;
