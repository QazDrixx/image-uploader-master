import classes from './UserRegistration.module.scss';
import { Formik } from 'formik';
import { Form, Button} from 'react-bootstrap';
import { FormWrap } from '../UI/FormWrap/FormWrap';
import { registrationSchema } from '../../services/validation';
import { login } from '../../services/axios';
import { useAuthHandler } from '../../hooks/useAuthHandler';
import { useSelector } from 'react-redux';
import { DotsLoading } from '../UI/DotsLoaing/DotsLoading';
import { useNavigate } from 'react-router-dom';

export const UserRegistration = () => {
    const handleAuth = useAuthHandler();
    const navigate = useNavigate()
    const isLoadingAuth = useSelector((state) => state.auth.isLoadingAuth)
    const submitRegistration = async (values) => {
        handleAuth(async () => await login(values, true))
    }
    
    return (
        <FormWrap headerText='Create a new user'>
            <Formik
                validationSchema={registrationSchema}
                onSubmit={submitRegistration}
                initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, dirty, isValid, touched, errors }) => (

                    <Form noValidate className={classes.Form} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="regUsername">
                            <Form.Label className={classes.FormLabel}>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='username'
                                placeholder="Username" 
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='username'
                                isInvalid={touched.username && errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="regEmail">
                            <Form.Label className={classes.FormLabel}>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name='email'
                                placeholder="name@example.com" 
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='email'
                                isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="regPassword">
                            <Form.Label className={classes.FormLabel}>Password</Form.Label>
                            <Form.Control 
                                type='password'
                                name='password'
                                placeholder="Password" 
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='off'
                                isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div onClick={() => navigate('/login/')} className={classes.Already}>Already have an account? Sign in</div>
                        <Button 
                            type="submit" 
                            disabled={!(dirty && isValid)} 
                            className={classes.RegistrationButton}
                        >
                            <div className={classes.ButtonText}>
                                {isLoadingAuth?<DotsLoading/>:'Registration'} 
                            </div>
                        </Button>
                    </Form>
                )}
            </Formik>

        </FormWrap>
    );
};
