import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import { UseStore } from "../../stores/Store";
import { UserStore } from "../../stores/UserStore";
import Path from "../../utils/route/Path";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cookie, setCookie] = useCookies(["token"]);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { userStore } = UseStore();

    if (cookie.token !== undefined) {
        history.push(Path.home);
    }

    const register = async () => {
        await userStore.register({ name: name, password: password, surname: surname, username: username });
        if (userStore.isLoggedIn) {
            setIsValid(true);
            setCookie("token", userStore.getUser.accessToken);
        } else {
            setIsValid(false);
        }
    };

    return (
        <Container className="container-auth">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Form className="auth-form">
                        <Form.Group className="auth-form-group auth-form-group-title">
                            <Form.Label className="form-auth-title">
                                <h1>Register</h1>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Form.Label className="auth-form-label">Name</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="text"
                                placeholder="name"
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                                isInvalid={!isValid}
                            />
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Form.Label className="auth-form-label">Surname</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="text"
                                placeholder="surname"
                                onChange={(e) => setSurname(e.target.value)}
                                required={true}
                                isInvalid={!isValid}
                            />
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Form.Label className="auth-form-label">Username</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="text"
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required={true}
                                isInvalid={!isValid}
                            />
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Form.Label className="auth-form-label">Password</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                                isInvalid={!isValid}
                            />
                            <Form.Control.Feedback type="invalid">{userStore.getMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Button variant="primary" type="button" onClick={register} className="login-submit">
                                Register
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Register;
