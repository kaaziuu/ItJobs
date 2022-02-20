import React from "react";
import { useCookies } from "react-cookie";
import { history } from "../..";
import Path from "./Path";

interface props {
    children: React.ReactNode;
}

const RouteWithSecurity = ({ children }: props) => {
    const [cookie] = useCookies(["token"]);
    if (cookie.token === undefined || cookie.token === null) {
        history.push(Path.home);
    }
    return <>{children}</>;
};

export default RouteWithSecurity;
