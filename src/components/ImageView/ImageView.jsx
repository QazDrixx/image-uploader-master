import classes from './ImageView.module.scss'
import { Success } from '../UI/SvgComponents/Success'
import { useParams } from 'react-router-dom';
import { useFetchImage } from '../../hooks/useFetchImage';
import { ImageLoading } from '../ImageLoading/ImageLoading';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getOneImage } from '../../services/axios';

export const ImageView = () => {
    const { imageId } = useParams()
    const isLoadingImage = useSelector(state => state.submit.isLoadingImage)
    const [imageData, setImageData] = useState()

    useFetchImage(async () => {
        const image = await getOneImage(imageId)
        if (image.status === 200) {
            setImageData(image.data)
        }
    })

    // console.log(imageData);

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
                
                <div className={classes.Preview} style={{"backgroundImage": `url(${imageData.imageURL})`}}></div>

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