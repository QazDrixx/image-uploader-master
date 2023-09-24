import classes from './AllImages.module.scss'
import { useState } from "react"
import { useFetchImage } from "../../hooks/useFetchImage"
import { getAllImages } from "../../services/axios"
import { ImagePreview } from "../UI/ImagePreview/ImagePreview"
import { useSelector } from 'react-redux'
import { ImageLoading } from '../ImageLoading/ImageLoading'
import { SearchPanel } from '../UI/SearchPanel/SearchPanel'


export const AllImages = () => {
    const [images, setImages] = useState([])
    const isLoadingImage = useSelector(state => state.submit.isLoadingImage)

    useFetchImage(async () => {
        const images = await getAllImages()
        if (images.status === 200) {
            setImages(images.data)
        }
    })

    const imageList = images.map(imageData => {
        return (
            <ImagePreview imageData={imageData} key={imageData._id}/>
        )
    })

    // console.log(images);
    return (
        <>
        {
        isLoadingImage
        ?
        <ImageLoading title={'Loading'}/>
        :
        imageList.length === 0
        ?
        <p>Images not found</p>
        :
        <div className={classes.Wrap}>
            <SearchPanel/>
            <ul className={classes.ul}>
                {imageList}
            </ul>
        </div>
        }
        </>
    )
}
