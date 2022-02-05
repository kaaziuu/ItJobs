import { useEffect } from "react";
import Header from "./components/header/Header";
import { UseStore } from "./stores/Store";
import { Setup } from "./utils/config/Config";
import Router from "./utils/route/Router";

function App() {
    Setup();
    const { userStore } = UseStore();
    useEffect(() => {
        userStore.intiLoad();
    }, [userStore]);
    return (
        <>
            <Header />
            <Router />
        </>
    );
}

export default App;
