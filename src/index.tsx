import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import Main from "./App";
import { AppProvider } from "./store/index";
import reportWebVitals from "./reportWebVitals";

const App = () => {
    return (
        <AppProvider>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </AppProvider>
    );
};
render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
