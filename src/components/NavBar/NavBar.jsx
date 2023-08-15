import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {
    return (
        <Navbar expand="lg" className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href="#home">Image Uploader</Navbar.Brand>
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
