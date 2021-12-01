import { useState, useContext, useEffect } from "react";
import CaretDown from "../assets/CaretDown.png";
import CaretDownWhite from "../assets/CaretDownWhite.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AppContext } from "../store/index";
const assets: any = [
    {
        symbol: "ETH",
        name: "Ethereum",
        color: "#3C3C3D",
        iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
        contractAddress: "0x",
        balance: 0,
        publicKey: "0xETH",
    },
];

const Swap = () => {
    const context = useContext(AppContext);
    const [originTokenState, setOriginTokenState] = useState(0);
    const [originTokenBalance, setOriginTokenBalance] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [originTokenSymbol, setOriginTokenSymbol] = useState("");
    const setOriginTokenInputState = (value: any) => {
        setOriginTokenState(value);
        console.log(value);
    };
    const connectWallet = () => {
        context.changeWalletConnectState(true);
        context.changeOriginTokenSymbol(context.mockWallet.assets[0].symbol);
        context.changeOriginTokenBalance(context.mockWallet.assets[0].balance);
    };
    const swap = () => {
        console.log("Swap");
    };
    useEffect(() => {
        setOriginTokenBalance(context.originTokenBalance);
        setWalletConnectState(context.walletConnectState);
        setOriginTokenSymbol(context.originTokenSymbol);
    }, [context.originTokenBalance, context.walletConnectState, context.originTokenSymbol]);
    return (
        <div className="swap-contents">
            <div className="content-header">
                <h4>Swap</h4>
            </div>
            <div className="swap-inputs">
                <div className="origin-token">
                    <div className="main-content">
                        <div className="tokenSelect">
                            <button>
                                <img src={assets[0].iconUrl} alt="token" className="tokenIcon" />
                                <p>ETH</p>
                                <img src={CaretDown} alt="caret-down" className="caretDown" />
                            </button>
                        </div>
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            onChange={(e) => setOriginTokenInputState(e.target.value)}
                        />
                    </div>
                    <div className="origin-token-balance">
                        {walletConnectState ? (
                            <p>
                                Balance: {originTokenBalance} {originTokenSymbol}
                            </p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
                <div className="tranfer">
                    <div className="tranfer-icon">
                        <img src={ArrowDown} alt="tranfer-icon" />
                    </div>
                </div>
                <div className="destinationToken">
                    <div className="main-content">
                        {/* <div className="tokenSelect">
                            <button>
                                <img src={assets[0].iconUrl} alt="token" className="tokenIcon" />
                                <p>ETH</p>
                                <img src={CaretDown} alt="caret-down" className="caretDown" />
                            </button>
                        </div> */}
                        <div className="choose-a-token">
                            <button>
                                <p>Select a token</p>
                                <img src={CaretDownWhite} alt="caret-down" className="caretDown" />
                            </button>
                        </div>
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            onChange={(e) => setOriginTokenInputState(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="swap-footer">
                {walletConnectState ? (
                    <button onClick={originTokenBalance <= 0 ? connectWallet : swap} className="enter-an-amount">
                        {originTokenBalance <= originTokenState ? (
                            <p>Insufficent token balance</p>
                        ) : (
                            <p>Enter an amount</p>
                        )}
                    </button>
                ) : (
                    <button disabled className="connected">
                        <p>Connect wallet</p>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Swap;
