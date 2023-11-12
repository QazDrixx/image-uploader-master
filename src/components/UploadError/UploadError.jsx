import classes from './UploadError.module.scss'
import PropTypes from "prop-types";
import { Error } from "../UI/SvgComponents/Error"
import { Link } from 'react-router-dom';

export const UploadError = ({errorText}) => {
    return (
        <div className={classes.Wrap}>
            <Error/>
            <div className={classes.Header}>{errorText}</div>
            <Link to={'/'} className={`btn btn-primary ${classes.TryAgainButton}`}>Go back</Link>
        </div>
    )
}

UploadError.propTypes = {
    errorText: PropTypes.string
  };