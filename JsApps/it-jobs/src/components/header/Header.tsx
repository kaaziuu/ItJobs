import { useState } from "react";
import { Nav, NavbarBrand } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Container, Navbar } from "react-bootstrap";
import Path from "../../utils/route/Path";

const Header = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={Path.home}>It Jobs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Offerts</Nav.Link>
                        {isLogin ? (
                            <NavDropdown title="My Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">My Offert</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">My Company</NavDropdown.Item>
                            </NavDropdown>
                        ) : null}
                    </Nav>
                    <Nav>
                        {isLogin ? (
                            <Nav.Link onClick={() => setIsLogin(false)}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link href={Path.login}>Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
