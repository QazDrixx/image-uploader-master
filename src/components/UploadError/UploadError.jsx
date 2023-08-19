import classes from './UploadError.module.scss'
import PropTypes from "prop-types";
import { Error } from "../UI/SvgComponents/Error"
import { Link } from 'react-router-dom';

export const UploadError = () => {



  return (
    <div className={classes.Wrap}>
        <Error/>
        <div className={classes.Header}>Something went wrong...</div>
        <Link to={'/'} className={classes.TryAgain}>Try Again</Link>
    </div>
  )
}

UploadError.propTypes = {
    goHome: PropTypes.func
};