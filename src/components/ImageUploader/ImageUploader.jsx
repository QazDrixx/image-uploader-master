import classes from './ImageUploader.module.scss'
import PropTypes from "prop-types";
import { DropArea } from '../UI/DropArea/DropArea'
import { FileChooser } from '../UI/FileChooser/FileChooser'
import { Or } from '../UI/Or/Or'

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
                <Or margin={'1.18rem 0 0 0'}/>
                <FileChooser sendImage={sendImage}/>
            </div>
        </div>
    )
}

ImageUploader.propTypes = {
    sendImage: PropTypes.func,
};
