import { useEffect } from 'react';
import { getUser } from '../services/axios';
import { useDispatch } from 'react-redux';
import { setUserData, setAuth, setFetchingUser } from '../redux/authSlice';

export const useFetchUser = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        (async function () {
            try {
                if (localStorage.getItem('token')) {
                    const user = await getUser()
                    if(user.status === 200) {
                        dispatch(setUserData(user.data))
                        dispatch(setAuth(true))
                    }
                }
            } catch (err) {
                console.error(err);
            }
            finally {
                dispatch(setFetchingUser(false))
            }
        }())
    }, [dispatch])
}
