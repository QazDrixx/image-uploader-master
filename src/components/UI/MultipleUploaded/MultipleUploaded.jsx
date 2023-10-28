import classes from '../../AllImages/AllImages.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const MultipleUploaded = () => {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location);
    const [uploadedImages] = useState(location.state || [])

    
    useEffect(() => {
        if (location.state) navigate(".", { replace: true });
        if (uploadedImages.length === 0) navigate('/')
    }, [navigate, uploadedImages, location.state]);

    const uploadedImagesList = uploadedImages.map(imageData => {
        return (
            <ImagePreview imageData={imageData} key={imageData._id} isShowImageOperations={false}/>
        )
    })
    return (
        <div className={classes.Wrap}>
            <span className={classes.uploadedImagesHeader}>Uploaded images</span>
            <div className={classes.navigateButtons}>
                <Button variant='primary' onClick={() => navigate('/')}>Upload more images</Button>
                <Button variant='primary' onClick={() => navigate('/allImages')}>View all uploaded images</Button>
            </div>
            <ul className={classes.ul}>
                {uploadedImagesList}
            </ul>
        </div>
    )
}

