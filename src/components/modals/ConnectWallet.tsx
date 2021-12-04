import { useContext, useState } from "react";
import { AppContext } from "../../store/index";
const ConnectWalletModal = () => {
    const context = useContext(AppContext);
    const [signInState, setSignInState] = useState(false);
    const [createWalletState, setCreateWalletState] = useState(false);
    const [ethAddress, setEthAddress] = useState("");
    const [walletPassword, setWalletPassword] = useState("");
    const connectWallet = () => {
        const walletIndex = context.wallet.findIndex((wallet: any) =>
            wallet.assets.find((eth: any) => eth.publicKey === ethAddress)
        );
        if (context.wallet[walletIndex].password === walletPassword) {
            context.changeOriginTokenBalance(context.mockWallet.assets[context.originToken].balance);
            context.changeWalletConnectState(true, walletIndex);
            context.toggleConnectWallet();
        } else {
            console.log("Something went wrong");
        }
    };
    const back = () => {
        setSignInState(false);
        setCreateWalletState(false);
    };
    const toggleSignInWallet = () => {
        setSignInState(true);
    };
    const toggleCreateWallet = () => {
        setCreateWalletState(true);
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
                    {signInState !== true && createWalletState !== true ? (
                        <div className="connect-wallet-buttons">
                            <button className="sign-in" onClick={toggleSignInWallet}>
                                <p>Sign In</p>
                            </button>
                            <button className="create" onClick={toggleCreateWallet}>
                                <p>Create Wallet</p>
                            </button>
                        </div>
                    ) : signInState ? (
                        <div className="wallet-actions">
                            <input
                                type="text"
                                placeholder="Ethereum Public Key"
                                onChange={(e) => setEthAddress(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setWalletPassword(e.target.value)}
                            />
                            <div className="footer">
                                <button className="back-button" onClick={back}>
                                    <p> Back</p>
                                </button>
                                <button className="confirm-button" onClick={connectWallet}>
                                    <p>Sign In</p>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="wallet-actions">
                            <input type="password" placeholder="password" />
                            <div className="footer">
                                <button className="back-button" onClick={back}>
                                    <p> Back</p>
                                </button>
                                <button className="confirm-button" onClick={connectWallet}>
                                    <p>Create Wallet</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletModal;
