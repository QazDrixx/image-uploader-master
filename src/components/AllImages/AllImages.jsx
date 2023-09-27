import classes from './AllImages.module.scss'
import { useFetchImage } from "../../hooks/useFetchImage"
import { getAllImages } from "../../services/axios"
import { ImagePreview } from "../UI/ImagePreview/ImagePreview"
import { useSelector, useDispatch } from 'react-redux'
import { ImageLoading } from '../ImageLoading/ImageLoading'
import { SearchPanel } from '../UI/SearchPanel/SearchPanel'
import { setImages } from '../../redux/submitSlice'


export const AllImages = () => {
    const isLoadingImage = useSelector(state => state.submit.isLoadingImage)
    const filteredImages = useSelector(state => state.submit.filteredImages)
    const dispatch = useDispatch()

    useFetchImage(async () => {
        const Fetchedimages = await getAllImages()
        if (Fetchedimages.status === 200) {
            dispatch(setImages(Fetchedimages.data))
        }
    })

    const imageList = filteredImages.map(imageData => {
        return (
            <ImagePreview imageData={imageData} key={imageData._id}/>
        )
    })

    console.log(filteredImages);

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
            <p>Images not found</p>
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
