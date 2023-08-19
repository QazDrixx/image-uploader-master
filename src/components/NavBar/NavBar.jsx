import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './NavBar.module.scss'
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <Navbar expand="lg" className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand><Link className={classes.Link} to={'/'}>Image Uploader</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavDropdown title={"User user"} className="ms-auto">
                        <NavDropdown.Item>Your images</NavDropdown.Item>
                        <NavDropdown.Item>Quit</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
