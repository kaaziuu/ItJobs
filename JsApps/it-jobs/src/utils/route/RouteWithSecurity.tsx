import { useCookies } from "react-cookie";
import { history } from "../..";
import Path from "./Path";

interface props {
    componenct: React.ReactNode;
}

const RouteWithSecurity = ({ componenct }: props) => {
    const [cookie] = useCookies(["token"]);
    if (cookie.token === undefined || cookie.token === null) {
        history.push(Path.home);
    }
    return componenct;
};

export default RouteWithSecurity;
