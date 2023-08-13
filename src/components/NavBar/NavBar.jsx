import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './NavBar.module.scss'
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {
    return (
        <Navbar expand="lg" className={`${classes.nav} bg-body-tertiary`}>
            <Navbar.Brand href="#home">Image Uploader</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{marginLeft:'auto'}}>
                    <Nav.Link>fcgnxfgn</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
