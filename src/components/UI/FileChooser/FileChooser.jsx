import classes from './FileChooser.module.scss';
import PropTypes from "prop-types";

export const FileChooser = ({sendImage}) => {
    return (
        <div className={classes.FileChooserWrap}>
            <label htmlFor="FileChooser" className={`btn btn-primary ${classes.FileChooser__label}`}>
                Choose a file
                <input
                    type="file"
                    id="FileChooser"
                    multiple={true}
                    className={classes.FileChooser__input}
                    accept="image/*"
                    onInput={e => sendImage(e.target.files)}
                />
            </label>
        </div>
    );
};

FileChooser.propTypes = {
    sendImage: PropTypes.func
};
