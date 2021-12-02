import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../store/index";
const ConnectWalletModal = () => {
    const context = useContext(AppContext);
    const connectWallet = () => {
        context.changeWalletConnectState(true);
        context.changeOriginTokenSymbol(context.mockWallet.assets[0].symbol);
        context.changeOriginTokenBalance(context.mockWallet.assets[0].balance);
        context.toggleConnectWallet();
    };
    return (
        <div className="modal">
            <div className="connect-wallet-modal">
                <div className="modal-contents">
                    <div className="title">
                        <h2>Connect a Wallet</h2>
                        <hr className="modal-hr" />
                    </div>
                    <div className="connect-wallet-buttons">
                        <button className="sign-in" onClick={connectWallet}>
                            <p>Sign In</p>
                        </button>
                        <button className="sign-up">
                            <p>Sign Up</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletModal;
