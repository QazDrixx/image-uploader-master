import { useDispatch } from "react-redux";
import { setAuth, setLoadingAuth, setAuthError, setUserData } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuthHandler = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return async (callback) => {
        try {
            dispatch(setLoadingAuth(true))
            const responce = await callback()

            if(responce.status === 200) {
                dispatch(setUserData({...responce.data}))
                localStorage.setItem('accessToken', responce.data.accessToken)
                dispatch(setAuth(true))
            }
            else dispatch(setAuthError(responce.data.msg))

        } catch (error) {
            navigate('/error/')
            console.error(error);
        } finally {
            dispatch(setLoadingAuth(false))
        }
    }
}
