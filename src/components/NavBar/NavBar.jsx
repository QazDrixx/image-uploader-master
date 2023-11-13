import { useSelector } from 'react-redux';
import classes from './NavBar.module.scss'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { DotsLoading } from '../UI/DotsLoaing/DotsLoading';
import { ModalWindow } from '../UI/ModalWindows/ModalWindow';
import { useLogOut } from '../../hooks/useLogOut';


export const NavBar = () => {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const userData = useSelector((state) => state.auth.userData)
    const isFetchingUser = useSelector((state) => state.auth.isFetchingUser)
    const navigate = useNavigate()
    const logOut = useLogOut()


    return (
        <Navbar expand="lg" className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand><Link className={classes.HomeLink} to={'/'}>Image Uploader</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {
                        isFetchingUser
                        ?
                        <DotsLoading/>
                        :
                        !isAuth
                        ?
                        <Nav className={`${classes.AuthButtons} ms-auto`}>
                            <Button onClick={() => navigate('/registration')} variant="primary" className="me-3">Sign up</Button>
                            <Button onClick={() => navigate('/login')} variant="secondary">Log in</Button>
                        </Nav>
                        :
                        <NavDropdown title={userData.username}>
                            <NavDropdown.Item onClick={() => navigate('/allImages')}>Your images</NavDropdown.Item>
                            <NavDropdown.Item>
                                <ModalWindow 
                                title='Do you really want to leave?'
                                agreeButtonText='Log out'
                                disagreeButtonText='Stay'
                                showModalBtn='Log Out'
                                callback={async () => await logOut()}
                                />
                            </NavDropdown.Item>
                        </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
