import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingState, setErrorState } from '../redux/submitSlice';

export const useSendImageHandler = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendImageHandler = async (callback) => {
        try {
            dispatch(setLoadingState(true))
            await callback();
            // navigate()
        
        } catch (error) {
            dispatch(setErrorState(error.response.data))
            navigate('/error')
            return error

        } finally {
            dispatch(setLoadingState(false))
        }
    };

    return [sendImageHandler];
};

