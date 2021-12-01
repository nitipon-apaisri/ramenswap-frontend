import React from "react";
import Menu from "./components/MenuBar";
import Swap from "./components/SwapBlock";
import "./style/style.css";
function App() {
    return (
        <div className="App">
            <div className="container">
                <Menu />
                <div className="contents">
                    <Swap />
                </div>
            </div>
        </div>
    );
}

export default App;
