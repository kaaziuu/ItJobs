import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import CenterContainer from "../../layout/common/CenterContainer";
import FormGroup from "../../layout/form/FormGroup";
import FormHeader from "../../layout/form/FormHeader";
import { UseStore } from "../../stores/Store";
import Path from "../../utils/route/Path";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const { userStore } = UseStore();
    const [cookie, setCookie] = useCookies(["token"]);

    if (cookie.token !== undefined) {
        history.push(Path.home);
    }

    const login = async () => {
        await userStore.login({ username: username, password: password });
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
    const baseClass = "auth-form";

    return (
        <CenterContainer containerClass="container-auth">
            <Form className="auth-form">
                <FormHeader baseClass={baseClass} title="Login" />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Username"
                    onChange={setUsername}
                    placeholder="username"
                    typeInput="text"
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={isInvalid}
                    isRequired={true}
                    labelText="Password"
                    onChange={setPassword}
                    placeholder="password"
                    typeInput="password"
                    feedbackText="invalid password or username"
                />
                <Form.Group className="auth-form-group">
                    <Button variant="primary" type="button" onClick={login} className="auth-submit">
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </CenterContainer>
    );
};

export default observer(Login);
