import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import CenterContainer from "../../layout/common/CenterContainer";
import FormGroup from "../../layout/form/FormGroup";
import FormHeader from "../../layout/form/FormHeader";
import { UseStore } from "../../stores/Store";
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
    const baseClass = "auth-form";

    return (
        <CenterContainer containerClass="container-auth">
            <Form className="auth-form">
                <FormHeader baseClass={baseClass} title="Register" />
                <FormGroup
                    baseClass={baseClass}
                    typeInput="text"
                    placeholder="name"
                    isInvalid={!isValid}
                    isRequired={true}
                    onChange={setName}
                    labelText="Name"
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={!isValid}
                    isRequired={true}
                    labelText="Surname"
                    onChange={setSurname}
                    placeholder="surname"
                    typeInput="text"
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={!isValid}
                    isRequired={true}
                    labelText="Username"
                    onChange={setUsername}
                    placeholder="username"
                    typeInput="text"
                />
                <FormGroup
                    baseClass={baseClass}
                    isInvalid={!isValid}
                    isRequired={true}
                    labelText="Password"
                    onChange={setPassword}
                    placeholder="password"
                    typeInput="password"
                    feedbackText={userStore.getMessage}
                />
                <Form.Group className="auth-form-group">
                    <Button variant="primary" type="button" onClick={register} className="auth-submit">
                        Register
                    </Button>
                </Form.Group>
            </Form>
        </CenterContainer>
    );
};

export default Register;
