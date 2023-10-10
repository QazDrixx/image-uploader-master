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
                console.log(response.data);
                navigate(`image/${response.data['_id']}`)
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

