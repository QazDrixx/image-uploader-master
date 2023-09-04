import classes from './ImageLoading.module.scss'

export const Loading = () => {
  return (
    <div className={classes.Wrap}>
        <span className={classes.Header}>
            Uploading...
        </span>
        <div className={classes.LoadingBar}>
            <div className={classes.Loading}></div>
        </div>
    </div>
  )
}
