import { observer } from "mobx-react-lite";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { UseStore } from "../../stores/Store";
import Path from "../../utils/route/Path";

const Header = () => {
    const { userStore } = UseStore();
    const isLogged = userStore.getisLoggedIn;
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies<string>(["token"]);

    const logout = () => {
        removeTokenCookie("token");
        userStore.logout();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={Path.home}>It Jobs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Job offers</Nav.Link>
                        {isLogged ? (
                            <NavDropdown title="My Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">My job offers</NavDropdown.Item>
                                <NavDropdown.Item href={Path.myComany}>My Company</NavDropdown.Item>
                            </NavDropdown>
                        ) : null}
                    </Nav>
                    <Nav>
                        {isLogged ? (
                            <>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href={Path.login}>Login</Nav.Link>
                                <Nav.Link href={Path.register}>Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default observer(Header);
