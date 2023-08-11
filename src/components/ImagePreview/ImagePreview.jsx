import classes from './ImagePreview.module.scss'
import { Success } from '../UI/SvgComponents/Success'
import PropTypes from "prop-types";

export const ImagePreview = ({imageUrl}) => {
  return (
    <div className={classes.Wrap}>
        <div className={classes.Header}>
            <Success/>
            <div className={classes.HeaderText}>
                Uploaded Successfully!
            </div>
        </div>
        
        <div className={classes.Preview} style={{"backgroundImage": `url(${imageUrl})`}}></div>

        <div className={classes.ImageUrlWrap}>
            <a href={imageUrl} className={classes.Url}>
                {imageUrl}
            </a>
            <div className={classes.CopyLink} onClick={() => {navigator.clipboard.writeText(imageUrl)}}>
                Copy Link
            </div>
        </div>
    </div>
  )
}

ImagePreview.propTypes = {
    imageUrl: PropTypes.string
};