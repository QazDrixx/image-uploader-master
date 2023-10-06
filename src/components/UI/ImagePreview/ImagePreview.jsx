/* eslint-disable react/prop-types */
import classes from './ImagePreview.module.scss';
import { useNavigate } from 'react-router-dom';
import { TrashCan } from '../SvgComponents/TrashCan';
import { ModalWindow } from '../modalWindows/ModalWindow';
import { deleteImage, getAllImages } from '../../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredImages, setImages } from '../../../redux/submitSlice';
import { useSort } from '../../../hooks/useFilter';

export const ImagePreview = ({ imageData }) => {
    const { imageOriginalName, imageURL, _id, createdAt } = imageData;
    const navigate = useNavigate();
    const navigateToImage = () => navigate(`/image/${_id}`);
    const dispatch = useDispatch()
    const sort = useSort()
    const sortType = useSelector(state => state.submit.sortType)
    
    const deleteHandle = async (_id) => {
        await deleteImage(_id)
        const {imageDataField, isReverse} = sortType
        const updatedImages = await getAllImages()
        const sortedImages = sort(imageDataField, [...updatedImages.data], isReverse)
        dispatch(setImages(sortedImages))
        dispatch(setFilteredImages(sortedImages))
    }

    return (
        <li className={classes.li}>
            <div className={classes.liContent}>
                <div className={classes.Preview}>
                    <div className={classes.Image}
                        title={imageOriginalName}
                        style={{ backgroundImage: `url(${imageURL})` }}
                        onClick={navigateToImage}                    
                    />

                    <span className={classes.createdAt}>Uploded: {new Date(createdAt).toLocaleString()}</span>
                </div>
                <span
                    className={classes.imageName}
                    title={imageOriginalName}
                    onClick={navigateToImage}
                >
                    {imageOriginalName}
                </span>
                <div className={classes.removeImage} title='Remove image'>
                    <ModalWindow
                        title='Do you really want to delete this image?'
                        agreeButtonText='Delete'
                        disagreeButtonText='Leave'
                        showModalBtn={<TrashCan/>}
                        callback={() => deleteHandle(_id)}
                    />
                </div>
            </div>
        </li>
    );
};
