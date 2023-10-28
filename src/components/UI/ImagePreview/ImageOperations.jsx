import classes from './ImagePreview.module.scss';
import PropTypes from 'prop-types';

import { TrashCan } from '../SvgComponents/TrashCan';
import { ModalWindow } from '../modalWindows/ModalWindow';
import { deleteImage, getAllImages, updateImage } from '../../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setImages } from '../../../redux/submitSlice';
import { Heart } from '../SvgComponents/Heart/Heart';
import { useState } from 'react';
import { useSort } from '../../../hooks/useFilter';


export const ImageOperations = ({isFavorite, imageId}) => {
    const [isLiked, setLiked] = useState(isFavorite)
    const sortType = useSelector(state => state.submit.sortType) 
    const images = useSelector(state => state.submit.images)
    const sort = useSort()
    const dispatch = useDispatch()
    
    const deleteHandle = async (_id) => {
        await deleteImage(_id)
        const updatedImages = await getAllImages()
        console.log(updatedImages);
        console.log(sortType.imageDataField);
        dispatch(setImages(sort(sortType.imageDataField, updatedImages.data, sortType.isReverse)))
    }

    const handleSetFavorite = async (_id) => {
        setLiked(!isLiked)
        await updateImage(_id, {favorite:!isLiked})
        dispatch(setImages(images.map((image) => {
            if (image._id == _id) image = {...image, favorite:!isLiked}
            return image
        })))
    }

    return (
        <div className={classes.imageOperations}>
            <div onClick={() => handleSetFavorite(imageId)}>
                <Heart isLiked={isLiked} />
            </div>
            <div className={classes.removeImage} title="Remove image">
                <ModalWindow
                    title="Do you really want to delete this image?"
                    agreeButtonText="Delete"
                    disagreeButtonText="Leave"
                    showModalBtn={<TrashCan />}
                    callback={() => deleteHandle(imageId)}
                />
            </div>
        </div>
    );
};

ImageOperations.propTypes = {
    isFavorite: PropTypes.bool,
    imageId: PropTypes.string,
};