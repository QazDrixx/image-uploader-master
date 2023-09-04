import { useDispatch } from "react-redux";
import { setAuth, setLoadingAuth, setAuthError, setUserData } from "../redux/authSlice";

export const useAuthHandler = () => {
    const dispatch = useDispatch()

    return async (callback) => {
        try {
            dispatch(setLoadingAuth(true))
            const responce = await callback()
            console.log(responce);

            if(responce.status === 200) {
                dispatch(setUserData({...responce.data}))
                localStorage.setItem('token', responce.data.token)
                dispatch(setAuth(true))
            }
            else dispatch(setAuthError(responce.data.msg))

        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoadingAuth(false))
        }
    }
}
