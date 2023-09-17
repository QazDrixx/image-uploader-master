import { useEffect, useState } from "react"
import { getOneImage } from "../services/axios"
import { setLoadingImage } from "../redux/submitSlice"
import { useDispatch } from "react-redux"

export const useFetchImage = (imageId) => {
    const [imageData, setImageData] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchImage = async () => {      
            try {
                dispatch(setLoadingImage(true))
                const image = await getOneImage(imageId)
                if (image.status === 200) {
                    setImageData(image.data)
                }
    
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoadingImage(false))
            }
        }
        fetchImage()
    }, [imageId, dispatch])

    return imageData
}