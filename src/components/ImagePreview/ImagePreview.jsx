import classes from './ImagePreview.module.scss'
import { Success } from '../UI/SvgComponents/Success'
import PropTypes from "prop-types";

export const ImagePreview = ({imageData}=null) => {
    if (!imageData) {
        return (
            <p>Image not found</p>
        )
    }
    const {fileUrl} = imageData

  return (
    <div className={classes.Wrap}>
        <div className={classes.Header}>
            <Success/>
            <div className={classes.HeaderText}>
                Uploaded Successfully!
            </div>
        </div>
        
        <div className={classes.Preview} style={{"backgroundImage": `url(${fileUrl})`}}></div>

        <div className={classes.ImageUrlWrap}>
            <a href={fileUrl} className={classes.Url}>
                {fileUrl}
            </a>
            <div className={classes.CopyLink} onClick={() => {navigator.clipboard.writeText(fileUrl)}}>
                Copy Link
            </div>
        </div>
    </div>
  )
}

ImagePreview.propTypes = {
    imageData: PropTypes.object
};