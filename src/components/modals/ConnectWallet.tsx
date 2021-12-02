import { useContext } from "react";
import { AppContext } from "../../store/index";
const ConnectWalletModal = () => {
    const context = useContext(AppContext);
    const connectWallet = () => {
        context.changeOriginTokenBalance(context.mockWallet.assets[context.originToken].balance);
        context.changeWalletConnectState(true);
        context.toggleConnectWallet();
    };
    const closeModal = () => {
        context.toggleConnectWallet();
    };
    return (
        <div className="modal">
            <div className="connect-wallet-modal">
                <div className="modal-contents">
                    <div className="title">
                        <h2>Connect a Wallet</h2>
                        <button className="closeModal" onClick={closeModal}>
                            <p>X</p>
                        </button>
                    </div>
                    <hr className="modal-hr" />
                    <div className="connect-wallet-buttons">
                        <button className="sign-in" onClick={connectWallet}>
                            <p>Sign In</p>
                        </button>
                        <button className="create">
                            <p>Create Wallet</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletModal;
