import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import classes from './NavBar.module.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useLogOut } from '../../hooks/useLogOut';

export const NavBar = () => {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const logOut = useLogOut()
    
    return (
        <Navbar expand="lg" className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand><Link className={classes.HomeLink} to={'/'}>Image Uploader</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                    !isAuth
                    ?
                    <Nav className="ms-auto">
                        <Button onClick={() => navigate('/registration')} variant="primary" className={`me-3 ${classes.ButtonPrimary}`}>Sign up</Button>
                        <Button onClick={() => navigate('/login')} variant="secondary">Log in</Button>
                    </Nav>
                    :
                    <NavDropdown title={userData.username} className="ms-auto">
                        <NavDropdown.Item>Your images</NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                    </NavDropdown>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

