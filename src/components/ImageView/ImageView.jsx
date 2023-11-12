import classes from './ImageView.module.scss'
import { Success } from '../UI/SvgComponents/Success'
import { useParams } from 'react-router-dom';
import { useFetchImage } from '../../hooks/useFetchImage';
import { ImageLoading } from '../ImageLoading/ImageLoading';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getOneImage } from '../../services/axios';
import { ImageName } from './ImageName';

export const ImageView = () => {
    const { imageId } = useParams()
    const isLoadingImage = useSelector(state => state.submit.isLoadingImage)
    const images = useSelector(state => state.submit.images)
    const [imageData, setImageData] = useState()

    useFetchImage(async () => {
        if (images.length === 0) {
            const image = await getOneImage(imageId)
            if (image.status === 200) {
                setImageData(image.data)
            }
        } else  {
            const foundImage = images.find((image) => image._id == imageId)
            setImageData(foundImage)
        }
    })

    return (
        <>
        {
            isLoadingImage
            ?
            <ImageLoading title='Loading image'/>
            :
            !imageData 
            ?
            <p>Image not found</p>
            :
            <div className={classes.Wrap}>
                <div className={classes.Header}>
                    <Success/>
                    <div className={classes.HeaderText}>
                        Uploaded Successfully!
                    </div>
                </div>

                <ImageName imageData={imageData}/>

                <div className={classes.ImageUrlWrap}>
                    <a href={imageData.imageURL} className={classes.Url}>
                        {imageData.imageURL}
                    </a>
                    <div className={`btn btn-primary ${classes.CopyLink}`} onClick={() => {navigator.clipboard.writeText(imageData.imageURL)}}>
                        Copy Link
                    </div>
                </div>
            </div>
        }
        </>
    )
}