import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";
import "./assets/index.scss";
import { store, StoreContext } from "./stores/Store";

export const history = createBrowserHistory();
ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <Router history={history}>
                <App />
            </Router>
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
