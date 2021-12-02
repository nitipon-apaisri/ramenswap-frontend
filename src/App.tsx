import { useState, useEffect, useContext } from "react";
import Menu from "./components/MenuBar";
import ConnectWalletModal from "./components/modals/ConnectWallet";
import Swap from "./components/SwapBlock";
import "./style/style.css";
import { AppContext } from "./store/index";
import Tokens from "./components/modals/SupportTokens";
function App() {
    const context = useContext(AppContext);
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    useEffect(() => {
        setSupportTokenModalState(context.supportTokenModalState);
        setConnectWalletModalState(context.connectWalletModalState);
    }, [context.connectWalletModalState, context.supportTokenModalState]);
    return (
        <div className="App">
            <div className="container">
                <Menu />
                <div className="contents">
                    <Swap />
                    {supportTokenModalState && <Tokens />}
                    {connectWalletModalState && <ConnectWalletModal />}
                </div>
            </div>
        </div>
    );
}

export default App;
