import classes from './Or.module.scss'
import PropTypes from "prop-types";

export const Or = ({ margin }) => {
    return (
        <div className={classes.Or} style={{margin:margin}}>Or</div>
    )
}

Or.propTypes = {
    margin: PropTypes.string
};
