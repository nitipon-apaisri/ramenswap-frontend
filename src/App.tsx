import { useState, useEffect, useContext } from "react";
import Menu from "./components/MenuBar";
import ConnectWalletModal from "./components/modals/ConnectWallet";
import Swap from "./components/SwapBlock";
import "./style/style.css";
import { AppContext } from "./store/index";
import Tokens from "./components/modals/SupportTokens";
import AssetsInWallet from "./components/modals/TokenInWallet";
function App() {
    const context = useContext(AppContext);
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    const [walletState, setWalletState] = useState(false);
    useEffect(() => {
        setWalletState(context.walletState);
        setSupportTokenModalState(context.supportTokenModalState);
        setConnectWalletModalState(context.connectWalletModalState);
    }, [context.connectWalletModalState, context.supportTokenModalState, context.walletState]);
    return (
        <div className="App">
            <div className="container">
                <Menu />
                <div className="contents">
                    <Swap />
                    {walletState && <AssetsInWallet />}
                    {supportTokenModalState && <Tokens />}
                    {connectWalletModalState && <ConnectWalletModal />}
                </div>
            </div>
        </div>
    );
}

export default App;
