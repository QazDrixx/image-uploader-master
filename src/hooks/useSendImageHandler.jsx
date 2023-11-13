import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingImage } from '../redux/submitSlice';
import { useSelector } from 'react-redux';

export const useSendImageHandler = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth)

    const sendImageHandler = async (callback) => {
        try {
            dispatch(setLoadingImage(true))
            if (!isAuth) {
                navigate('registration/')
            }
            const response = await callback();
            if (response.status === 200) {
                if (response.data.length === 1) navigate(`image/${response.data[0]['_id']}`)
                else navigate(`multipleUploaded/`, {state: response.data})
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

