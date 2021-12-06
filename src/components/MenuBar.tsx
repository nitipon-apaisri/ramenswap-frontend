import { useState, useContext, useEffect } from "react";
import logo from "../assets/ramen.png";
import ethLogo from "../assets/eth.svg";
import otherIcon from "../assets/cicrle.svg";
import { AppContext } from "../store/index";
const Menu = () => {
    const context = useContext(AppContext);
    const [toggleState, setToggleState] = useState(1);
    const [ethAddress, setEthAddress] = useState("");
    const [walletOptionsState, setWalletOptionState] = useState(false);
    const toggleTab = (index: number) => {
        setToggleState(index);
    };

    const connectWallet = () => {
        context.toggleConnectWallet();
    };
    const toggleWalletOption = () => {
        setWalletOptionState(!walletOptionsState);
    };
    const signOut = () => {
        window.location.reload();
    };
    useEffect(() => {
        if (context.walletConnectState)
            if (context.wallet.length !== 0) {
                setEthAddress(context.wallet[context.walletIndex].assets[context.walletIndex].publicKey);
            }
    }, [context.walletConnectState, context.walletIndex, context.wallet]);
    const getActiveClass = (index: number, className: string) => (toggleState === index ? className : "");

    return (
        <div className="menu-bar">
            <div className="banner">
                <img src={logo} alt="logo" />
                <h3>RamenSwap</h3>
            </div>
            <div className="menu-options">
                <button className={` ${getActiveClass(1, "active")}`} onClick={() => toggleTab(1)}>
                    <p>Swap</p>
                </button>
                <button className={` ${getActiveClass(2, "active")}`} onClick={() => toggleTab(2)}>
                    <p>Transactions</p>
                </button>
                <button disabled>
                    <p>Coming Soon</p>
                </button>
            </div>
            <div className="menu-actions">
                <div className="network">
                    <button>
                        <img src={ethLogo} alt="networkLogo" />
                        <p>Ethereum</p>
                    </button>
                </div>
                <div className="wallet">
                    {ethAddress ? (
                        !walletOptionsState ? (
                            <button onClick={toggleWalletOption} className="connected">
                                <p>{ethAddress}</p>
                            </button>
                        ) : (
                            <div className="wallet-options">
                                <button onClick={toggleWalletOption} className="connected start-option">
                                    <p>{ethAddress}</p>
                                </button>
                                <button className="connected middle-option">
                                    <p>Tokens</p>
                                </button>
                                <button onClick={signOut} className="connected end-option">
                                    <p>Sign Out</p>
                                </button>
                            </div>
                        )
                    ) : (
                        <button onClick={connectWallet} className="not-connect">
                            <p>Connect wallet</p>
                        </button>
                    )}
                </div>
                <div className="other">
                    <img src={otherIcon} alt="other" />
                </div>
            </div>
        </div>
    );
};

export default Menu;
