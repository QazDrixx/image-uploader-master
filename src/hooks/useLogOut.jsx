import { useDispatch } from "react-redux";
import { setAuth, setUserData } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/axios";

export const useLogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return async () => {
        localStorage.removeItem('accessToken')
        await logout()
        dispatch(setUserData(null))
        dispatch(setAuth(false))
        navigate('/')
    }

}