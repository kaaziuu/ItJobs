import { Route, Switch } from "react-router";
import MyCompany from "../../pages/company/MyCompany";
import CreateCompany from "../../pages/company/CreateCompany";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Path from "./Path";
import RouteWithSecurity from "./RouteWithSecurity";
import UpdateCompany from "../../pages/company/UpdateCompany";
import JobOfferList from "../../pages/jobOffer/list/JobOfferList";
import JobOfferDetails from "../../pages/jobOffer/details/JobOfferDetails";

const Router = () => (
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
        <Route exact path={Path.myComany}>
            <RouteWithSecurity>
                <MyCompany />
            </RouteWithSecurity>
        </Route>
        <Route exact path={Path.createCompany}>
            <RouteWithSecurity>
                <CreateCompany />
            </RouteWithSecurity>
        </Route>
        <Route exact path={Path.updateCompany}>
            <RouteWithSecurity>
                <UpdateCompany />
            </RouteWithSecurity>
        </Route>
        <Route path={Path.jobOfferDetails}>
            <JobOfferDetails />
        </Route>
        <Route exact path={Path.jobOffer}>
            <JobOfferList />
        </Route>
    </Switch>
);

export default Router;
