import classes from './ImageUploader.module.scss'
import { DropArea } from '../UI/DropArea/DropArea'
import { FileChooser } from '../UI/FileChooser/FileChooser'
import PropTypes from "prop-types";

export const ImageUploader = ({sendImage}) => {
    return (
        <div className={classes.Wrap}>
            <div className={classes.Header}>
                <div className={classes.HeaderText}>
                    Upload your image
                </div>
                <div className={classes.HeaderSubText}>
                    File should be Jpeg, Png,...
                </div>
            </div>

            <div>
                <DropArea sendImage={sendImage}/>
                <div className={classes.Or}>Or</div>
                <FileChooser sendImage={sendImage}/>
            </div>
        </div>
    )
}

ImageUploader.propTypes = {
    sendImage: PropTypes.func
};
