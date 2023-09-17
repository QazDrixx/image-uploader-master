import { useDispatch } from "react-redux";
import { setAuth, setUserData } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return () => {
        localStorage.removeItem('token')
        dispatch(setUserData(null))
        dispatch(setAuth(false))
        navigate('/')
    }

}