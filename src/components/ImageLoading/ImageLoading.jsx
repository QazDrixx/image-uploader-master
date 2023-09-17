/* eslint-disable react/prop-types */
import classes from './ImageLoading.module.scss'


export const ImageLoading = ({title}) => {
  return (
    <div className={classes.Wrap}>
        <span className={classes.Header}>
            {title}
        </span>
        <div className={classes.LoadingBar}>
            <div className={classes.Loading}></div>
        </div>
    </div>
  )
}


