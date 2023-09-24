/* eslint-disable react/prop-types */
import classes from './ImagePreview.module.scss';
import { useNavigate } from 'react-router-dom';
import { TrashCan } from '../SvgComponents/TrashCan';

export const ImagePreview = ({ imageData }) => {
    const { imageOriginalName, imageURL, _id } = imageData;
    const navigate = useNavigate();
    const navigateToImage = () => navigate(`/image/${_id}`);
    return (
        <li className={classes.li}>
            <div className={classes.liContent}>
                <div
                    className={classes.Preview}
                    title={imageOriginalName}
                    style={{ backgroundImage: `url(${imageURL})` }}
                    onClick={navigateToImage}
                />
                <span
                    className={classes.imageName}
                    title={imageOriginalName}
                    onClick={navigateToImage}
                >
                    {imageOriginalName}
                </span>
                <div className={classes.removeImage} title='Remove image'>
                    <TrashCan/>
                </div>
            </div>
        </li>
    );
};
