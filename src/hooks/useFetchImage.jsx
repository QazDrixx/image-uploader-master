import { useEffect } from "react"
import { setLoadingImage } from "../redux/submitSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useFetchImage = (callback) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchImage = async () => {      
            try {
                dispatch(setLoadingImage(true))
                await callback()
    
            } catch (error) {
                navigate('/error')
                console.log(error);
            } finally {
                dispatch(setLoadingImage(false))
            }
        }
        fetchImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}