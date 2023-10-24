import classes from './Heart.module.scss'
import PropTypes from 'prop-types';


export const Heart = ({isLiked}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
        >
            <path
                className={`${classes.Heart} ${isLiked?classes.like:''}`}
                fill="#cccccc"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M27.785 6.148a7.328 7.328 0 00-10.37 0L16 7.558l-1.414-1.41a7.328 7.328 0 00-10.371 0 7.328 7.328 0 000 10.372l1.41 1.414L16 28.309l10.375-10.375 1.41-1.414a7.328 7.328 0 000-10.372zm0 0"
            ></path>
        </svg>
    );
};

Heart.propTypes = {
    isLiked: PropTypes.bool
}