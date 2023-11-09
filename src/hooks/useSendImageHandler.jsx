import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingImage } from '../redux/submitSlice';

export const useSendImageHandler = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendImageHandler = async (callback) => {
        try {
            dispatch(setLoadingImage(true))
            const response = await callback();
            if (response.status === 200) {
                if (response.data.length === 1) navigate(`image/${response.data[0]['_id']}`)
                else navigate(`multipleUploaded/`, {state: response.data})
            }
            else if (response.status === 401) {
                navigate('registration/')
            }
            // navigate()
        
        } catch (error) {
            navigate('/error')
            console.error(error);

        } finally {
            dispatch(setLoadingImage(false))
        }
    };

    return [sendImageHandler];
};

