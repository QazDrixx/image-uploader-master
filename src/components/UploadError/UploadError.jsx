import classes from './UploadError.module.scss'
import PropTypes from "prop-types";
import { Error } from "../UI/SvgComponents/Error"

export const UploadError = ({goHome}) => {



  return (
    <div className={classes.Wrap}>
        <Error/>
        <div className={classes.Header}>Something went wrong...</div>
        <div className={classes.TryAgain} onClick={() => goHome()}>Try again</div>
    </div>
  )
}

UploadError.propTypes = {
    goHome: PropTypes.func
};