import { useContext, useState } from "react";
import { AppContext } from "../../store/index";

const ConnectWalletModal = () => {
    const context = useContext(AppContext);
    const [signInState, setSignInState] = useState(false);
    const [createWalletState, setCreateWalletState] = useState(false);
    const [walletInfoState, setWalletStateInfo] = useState(false);
    const [ethAddress, setEthAddress] = useState("");
    const [walletPassword, setWalletPassword] = useState("");
    const [createWalletPassword, setCreateWalletPassword] = useState("");
    const connectWallet = () => {
        context.signIn(ethAddress);
        setTimeout(() => {
            const walletIndex = context.wallet.findIndex((wallet: any) =>
                wallet.assets.find((eth: any) => eth.publicKey === ethAddress)
            );
            if (context.wallet[walletIndex].password === walletPassword) {
                context.changeWalletConnectState(true, walletIndex);
                context.toggleConnectWallet();
            } else {
                console.log("Something went wrong");
            }
        }, 100);
    };
    const createWallet = () => {
        context.createWallet(createWalletPassword);
        setTimeout(() => {
            setWalletStateInfo(true);
        }, 300);
    };
    const back = () => {
        setSignInState(false);
        setCreateWalletState(false);
    };
    const backToSignIn = () => {
        setCreateWalletState(false);
        setSignInState(true);
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
                        <h2>
                            {createWalletState
                                ? walletInfoState
                                    ? "Wallet Info"
                                    : "Create Wallet"
                                : "Connect a Wallet"}
                        </h2>
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
                    ) : createWalletState ? (
                        walletInfoState ? (
                            <div className="wallet-info">
                                <div className="wallet-public-key">
                                    <p>
                                        Your Ethereum Public Key: <b>{context.signInInfo.ethPublicKey}</b>
                                    </p>
                                    {/* <p>{context.signInInfo.ethPublicKey}</p> */}
                                </div>
                                <div className="footer">
                                    <button className="confirm-button" onClick={backToSignIn}>
                                        <p>Sign In</p>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="wallet-actions">
                                <input
                                    type="password"
                                    placeholder="Wallet password"
                                    onChange={(e) => setCreateWalletPassword(e.target.value)}
                                />
                                <div className="footer">
                                    <button className="back-button" onClick={back}>
                                        <p> Back</p>
                                    </button>
                                    <button className="create-wallet-button" onClick={createWallet}>
                                        <p>Create Wallet</p>
                                    </button>
                                </div>
                            </div>
                        )
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
