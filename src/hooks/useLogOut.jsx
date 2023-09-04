import { useDispatch } from "react-redux";
import { setAuth, setUserData } from "../redux/authSlice";

export const useLogOut = () => {
    const dispatch = useDispatch()

    return () => {
        localStorage.removeItem('token')
        dispatch(setUserData(null))
        dispatch(setAuth(false))
    }

}