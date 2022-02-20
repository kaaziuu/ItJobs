import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Header from "./components/header/Header";
import { UseStore } from "./stores/Store";
import { Setup } from "./utils/config/Config";
import Router from "./utils/route/Router";

function App() {
    Setup();
    const { userStore } = UseStore();
    const [tokenCookie] = useCookies<string>(["token"]);
    useEffect(() => {
        userStore.intiLoad(tokenCookie.token);
    }, [userStore]);
    return (
        <>
            <Header />
            <Router />
        </>
    );
}

export default App;
