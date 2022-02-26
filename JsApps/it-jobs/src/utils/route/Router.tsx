import { Route, Switch } from "react-router";
import CreateCompany from "../../pages/company/CreateCompany";
import MyCompany from "../../pages/company/MyCompany";
import UpdateCompany from "../../pages/company/UpdateCompany";
import JobOfferCreate from "../../pages/jobOffer/create/JobOfferCreate";
import JobOfferDetails from "../../pages/jobOffer/details/JobOfferDetails";
import JobOfferList from "../../pages/jobOffer/list/JobOfferList";
import JobOfferUpdate from "../../pages/jobOffer/update/JobOfferUpdate";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Path from "./Path";
import RouteWithSecurity from "./RouteWithSecurity";

const Router = () => (
    <Switch>
        <Route exact path={Path.home}>
            <JobOfferList />
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
        <Route exact path={Path.jobOfferCreate}>
            <RouteWithSecurity>
                <JobOfferCreate />
            </RouteWithSecurity>
        </Route>
        <Route path={Path.jobOfferUpdate}>
            <RouteWithSecurity>
                <JobOfferUpdate />
            </RouteWithSecurity>
        </Route>
        <Route path={Path.jobOfferDetails}>
            <JobOfferDetails />
        </Route>
    </Switch>
);

export default Router;
