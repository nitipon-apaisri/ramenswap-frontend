import { useState, useEffect, useContext } from "react";
import Menu from "./components/MenuBar";
import ConnectWalletModal from "./components/modals/ConnectWallet";
import Swap from "./components/SwapBlock";
import "./style/style.css";
import { AppContext } from "./store/index";
function App() {
    const context = useContext(AppContext);
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    useEffect(() => {
        setConnectWalletModalState(context.connectWalletModalState);
    }, [context.connectWalletModalState]);
    return (
        <div className="App">
            <div className="container">
                <Menu />
                <div className="contents">
                    <Swap />
                    {connectWalletModalState && <ConnectWalletModal />}
                </div>
            </div>
        </div>
    );
}

export default App;
