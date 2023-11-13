import classes from './ImagePreview.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ImageOperations } from './ImageOperations'


export const ImagePreview = ({ imageData, isShowImageOperations=true }) => {
    const { imageOriginalName, imageURL, _id, createdAt, favorite} = imageData;
    const navigate = useNavigate();
    const navigateToImage = () => navigate(`/image/${_id}`);

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
                {isShowImageOperations?<ImageOperations isFavorite={favorite} imageId={_id}/>:null}
            </div>
        </li>
    );
};

ImagePreview.propTypes = {
    imageData: PropTypes.object,
    isShowImageOperations: PropTypes.bool
};
