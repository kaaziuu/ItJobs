import { Route, Switch } from "react-router";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
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
            </Switch>
        </>
    );
};

export default Router;
