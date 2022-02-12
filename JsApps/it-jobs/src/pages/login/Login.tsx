import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "../../assets/login/login.scss";
import { UseStore } from "../../stores/Store";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const { userStore } = UseStore();
    const [cookie, setCookie] = useCookies(["token"]);

    const login = async () => {
        await userStore.login({ username: username, password: password });
        console.log(userStore.getUser.id);
        console.log(userStore.getisLoggedIn);
        if (userStore.getisLoggedIn) {
            setIsInvalid(false);
            setCookie("token", userStore.getUser.accessToken);
        } else {
            setIsInvalid(true);
        }
    };

    if (userStore.isLoading) {
        return <h1>loading</h1>;
    }

    return (
        <Container className="container-login">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Form className="login-form">
                        <Form.Group className="login-form-group login-form-group-title">
                            <Form.Label className="form-login-title">
                                <h1>login</h1>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group className="login-form-group">
                            <Form.Label className="login-form-label">Username</Form.Label>
                            <Form.Control
                                className="login-form-input"
                                type="text"
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required={true}
                                isInvalid={isInvalid}
                            />
                        </Form.Group>
                        <Form.Group className="login-form-group">
                            <Form.Label className="login-form-label">Password</Form.Label>
                            <Form.Control
                                className="login-form-input"
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                                isInvalid={isInvalid}
                            />
                            <Form.Control.Feedback type="invalid">invalid password or username</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="login-form-group">
                            <Button variant="primary" type="button" onClick={login} className="login-submit">
                                Login
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default observer(Login);
