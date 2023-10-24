import classes from '../UserRegistration/UserRegistration.module.scss';
import { useAuthHandler } from '../../hooks/useAuthHandler'
import { FormWrap } from '../UI/FormWrap/FormWrap'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik';
import { DotsLoading } from '../UI/DotsLoaing/DotsLoading';
import { useSelector } from 'react-redux';
import { loginSchema } from '../../services/validation';
import { login } from '../../services/axios';
import { useNavigate } from 'react-router-dom';


export const UserLogin = () => {
    const handleAuth = useAuthHandler()
    const navigate = useNavigate()
    const isLoadingAuth = useSelector(state => state.auth.isLoadingAuth)
    const submitLogin = async (values) => {
        handleAuth(async () => await login(values))
    }

    return (
        <FormWrap headerText='Log in'>
            <Formik
                validationSchema={loginSchema}
                initialValues={{
                    emailOrUsername:'',
                    password:''
                }}
                onSubmit={submitLogin}
            >
            {({ handleSubmit, handleChange, handleBlur, values, dirty, isValid, errors, touched }) => (
                <Form noValidate className={classes.Form} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="loginUsername">
                        <Form.Label className={classes.FormLabel}>Email or Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='emailOrUsername'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.emailOrUsername}
                            placeholder="Email or Username" 
                            autoComplete='username'
                            isInvalid={errors.emailOrUsername && touched.emailOrUsername}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.emailOrUsername}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="logingUsername">
                        <Form.Label className={classes.FormLabel}>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password" 
                            autoComplete='off'
                            isInvalid={errors.password && touched.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div onClick={() => navigate('/registration/')} className={classes.Already}> Not have an account? Register</div>
                    <Button 
                        type="submit" 
                        disabled={!(dirty && isValid)} 
                        className={classes.RegistrationButton}
                    >
                        <div className={classes.ButtonText}>
                            {isLoadingAuth?<DotsLoading/>:'Log in'} 
                        </div>
                    </Button>
                </Form>
            )}
            </Formik>
        </FormWrap>
    )
}
