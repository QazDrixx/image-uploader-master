import classes from './CreatedBy.module.scss'

export const CreatedBy = () => {
  return (
    <div className={classes.CreatedBy}>
        created by <a href="https://github.com/QazDrixx" className={classes.Username}>QazDrixx</a>
    </div>

  )
}
