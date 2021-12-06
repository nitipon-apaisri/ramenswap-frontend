import { useState, useEffect, useContext } from "react";
import Menu from "./components/MenuBar";
import ConnectWalletModal from "./components/modals/ConnectWallet";
import Swap from "./components/SwapBlock";
import "./style/style.css";
import { AppContext } from "./store/index";
import Tokens from "./components/modals/SupportTokens";
import AssetsInWallet from "./components/modals/TokenInWallet";
import SwapResult from "./components/SwapResult";
function App() {
    const context = useContext(AppContext);
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [swapBlockState, setSwapBlockState] = useState(true);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    const [walletState, setWalletState] = useState(false);
    const [swapResultState, setSwapResultState] = useState(false);
    useEffect(() => {
        setWalletState(context.walletState);
        setSupportTokenModalState(context.supportTokenModalState);
        setConnectWalletModalState(context.connectWalletModalState);
        setSwapResultState(context.swapResultState);
        setSwapBlockState(context.swapBlockState);
    }, [
        context.connectWalletModalState,
        context.supportTokenModalState,
        context.walletState,
        context.swapResultState,
        context.swapBlockState,
    ]);
    return (
        <div className="App">
            <div className="container">
                <Menu />
                <div className="contents">
                    {swapBlockState && <Swap />}
                    {walletState && <AssetsInWallet />}
                    {supportTokenModalState && <Tokens />}
                    {connectWalletModalState && <ConnectWalletModal />}
                    {swapResultState && <SwapResult />}
                </div>
            </div>
        </div>
    );
}

export default App;
