/* eslint-disable react/prop-types */
import classes from './FormWrap.module.scss'
import { User } from '../SvgComponents/User'
import { useSelector, useDispatch } from 'react-redux';
import { setAuthError } from '../../../redux/authSlice';
import { Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormWrap = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const authError = useSelector((state) => state.auth.authError)

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [isAuth, navigate]);
    
    useEffect(() => {
        return () => {
            if (authError) dispatch(setAuthError(null))
        }
    })
    
    return (
        <div className={classes.FormWrap}>
            <div className={classes.RegistrationHeader}>
                <User />
                <div className={classes.HeaderText}>{props.headerText}</div>
            </div>
            {authError && <Alert variant='danger' className={classes.Error}>{authError}</Alert>}
            {props.children}
        </div>
    )
}
