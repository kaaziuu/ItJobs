import { Route, Switch } from "react-router";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Path from "./Path";

const Router = () => {
    return (
        <>
            <Switch>
                <Route exact path={Path.home}>
                    <Home />
                </Route>
                <Route exact path={Path.login}>
                    <Login />
                </Route>
                <Route exact path={Path.register}>
                    <Register />
                </Route>
            </Switch>
        </>
    );
};

export default Router;
