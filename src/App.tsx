import { Routes, Route } from "react-router-dom";
import Application from "./Views/Application";
import UserWallet from "./Views/UserWallet";
const App = () => {
    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route path="/" element={<Application />} />
                    <Route path="/wallet/:ethPublicKey" element={<UserWallet />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
