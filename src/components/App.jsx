import '../scss/App.scss';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { useSendImageHandler } from '../hooks/useSendImageHandler';
import { UserRegistration } from './UserRegistration/UserRegistration';
import { useEffect, useState } from 'react';
import { postFile } from '../services/postFile';
import { UploadError } from './uploadError/uploadError';
import { Layout } from './Layout/Layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserLogin } from './UserLogin/UserLogin';
import { getUser } from '../services/axios';
import { useDispatch } from 'react-redux';
import { setUserData, setAuth } from '../redux/authSlice';

function App() {
    const [imageData, setImageData] = useState();
    const [sendImageHandler] = useSendImageHandler();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        (async function () {
            if (localStorage.getItem('token')) {
                const user = await getUser()
                if(user.status === 200) {
                    dispatch(setUserData(user.data))
                    dispatch(setAuth(true))
                    console.log(user);
                }
            }
        }())
    })

    const sendImage = async (image) => {
        sendImageHandler(async () => {
            const response = await postFile(image);
            setImageData(response.data);
            navigate(`image/${response.data['filename']}`)
        });
    };

    return (
        <>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<ImageUploader sendImage={sendImage}/>} />

                <Route path='/registration' element={<UserRegistration/>} />
                <Route path='/login' element={<UserLogin/> }/>
                <Route path='image/:imageName' element={<ImagePreview imageData={imageData} />}/>
                <Route path='error' element={<UploadError />}/>
            </Route>
        </Routes>  
        </>
    );
}

export default App;
