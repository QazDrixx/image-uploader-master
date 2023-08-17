import classes from './ImagePreview.module.scss'
import { Success } from '../UI/SvgComponents/Success'
import PropTypes from "prop-types";

export const ImagePreview = ({imageData}=null) => {
    if (!imageData) {
        return (
            <p>Image not found</p>
        )
    }
    const {image_url} = imageData

  return (
    <div className={classes.Wrap}>
        <div className={classes.Header}>
            <Success/>
            <div className={classes.HeaderText}>
                Uploaded Successfully!
            </div>
        </div>
        
        <div className={classes.Preview} style={{"backgroundImage": `url(${image_url})`}}></div>

        <div className={classes.ImageUrlWrap}>
            <a href={image_url} className={classes.Url}>
                {image_url}
            </a>
            <div className={classes.CopyLink} onClick={() => {navigator.clipboard.writeText(image_url)}}>
                Copy Link
            </div>
        </div>
    </div>
  )
}

ImagePreview.propTypes = {
    imageData: PropTypes.object
};