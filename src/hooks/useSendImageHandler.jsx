import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingImage, setErrorState } from '../redux/submitSlice';

export const useSendImageHandler = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendImageHandler = async (callback) => {
        try {
            dispatch(setLoadingImage(true))
            const response = await callback();
            console.log(response.data);
            if (response.status === 200) {
                navigate(`image/${response.data['_id']}`)
            }
            // navigate()
        
        } catch (error) {
            dispatch(setErrorState(error.response.data))
            navigate('/error')
            console.log(error);

        } finally {
            dispatch(setLoadingImage(false))
        }
    };

    return [sendImageHandler];
};

