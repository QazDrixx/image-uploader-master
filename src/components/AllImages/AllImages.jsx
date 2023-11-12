import classes from './AllImages.module.scss'
import { useFetchImage } from "../../hooks/useFetchImage"
import { getAllImages } from "../../services/axios"
import { ImagePreview } from "../UI/ImagePreview/ImagePreview"
import { useSelector, useDispatch } from 'react-redux'
import { ImageLoading } from '../ImageLoading/ImageLoading'
import { SearchPanel } from '../UI/SearchPanel/SearchPanel'
import { setImages } from '../../redux/submitSlice'
import { useEffect } from 'react'


export const AllImages = () => {
    const isLoadingImage = useSelector(state => state.submit.isLoadingImage)
    const images = useSelector(state => state.submit.filteredImages)
    const dispatch = useDispatch()

    useFetchImage(async () => {
        const Fetchedimages = await getAllImages()
        if (Fetchedimages.status === 200) {
            dispatch(setImages(Fetchedimages.data))
        }
    })

    useEffect(() => {
        return () => {
            dispatch(setImages([]))
        }
    }, [dispatch])


    const imageList = images.map(imageData => {
        return (
            <ImagePreview imageData={imageData} key={imageData._id}/>
        )
    })

    return (
        <>
        {
        isLoadingImage
        ?
        <ImageLoading title={'Loading'}/>
        :
        <div className={classes.Wrap}>
            <SearchPanel/>
            {        
            imageList.length === 0
            ?
            <div className={classes.notFound}>Images not found</div>
            :
            <ul className={classes.ul}>
                {imageList}
            </ul>
            }
        </div>
        }
        </>
    )
}
