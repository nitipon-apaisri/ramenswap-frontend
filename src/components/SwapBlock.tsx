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
    const [insufficentState, setInsufficentState] = useState("");
    const [selectTokenState, setSelectTokenState] = useState(Number);
    const [tokenIndex, setTokenIndex] = useState(Number);
    const setOriginTokenInputState = (value: any) => {
        setOriginTokenState(Number(value));
    };
    const connectWallet = () => {
        context.toggleConnectWallet();
    };
    const swap = () => {
        console.log("Swap");
    };
    const toggleSupportTokens = () => {
        context.toggleSupportTokens();
    };
    useEffect(() => {
        if (originTokenBalance < originTokenState) {
            setInsufficentState("Insufficent");
        } else if (originTokenState === 0 || null) {
            setInsufficentState("Enter an amount");
        } else {
            setInsufficentState("Swap");
        }
        setTokenIndex(context.tokenSelectIndex);
        setSelectTokenState(context.selectTokenState);
        setOriginTokenBalance(context.originTokenBalance);
        setWalletConnectState(context.walletConnectState);
        setOriginTokenSymbol(context.originTokenSymbol);
    }, [
        context.originTokenBalance,
        context.walletConnectState,
        context.originTokenSymbol,
        context.selectTokenState,
        context.tokenSelectIndex,
        originTokenState,
        originTokenBalance,
    ]);
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
                                <p>{assets[0].symbol}</p>
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
                    <div className="swap-input-footer">
                        <div className="balance">
                            {walletConnectState ? (
                                <p>
                                    Balance: {originTokenBalance} {originTokenSymbol}
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <div className="token-to-fiat">
                            {originTokenState !== 0 ? <p>≈ {`$${originTokenState * 4600}`}</p> : <p></p>}
                        </div>
                    </div>
                </div>
                <div className="tranfer">
                    <div className="tranfer-icon">
                        <img src={ArrowDown} alt="tranfer-icon" />
                    </div>
                </div>
                <div className="destination-token">
                    <div className="main-content">
                        {selectTokenState ? (
                            <div className="tokenSelect">
                                <button onClick={context.toggleSupportTokens}>
                                    <img
                                        src={`${context.supportTokens[tokenIndex].iconUrl}`}
                                        alt="token"
                                        className="tokenIcon"
                                    />
                                    <p>{context.supportTokens[tokenIndex].symbol}</p>
                                    <img src={CaretDown} alt="caret-down" className="caretDown" />
                                </button>
                            </div>
                        ) : (
                            <div className="choose-a-token">
                                <button onClick={toggleSupportTokens}>
                                    <p>Select a token</p>
                                    <img src={CaretDownWhite} alt="caret-down" className="caretDown" />
                                </button>
                            </div>
                        )}
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            onChange={(e) => setOriginTokenInputState(e.target.value)}
                        />
                    </div>
                    <div className="swap-input-footer">
                        <div className="balance">
                            <p></p>
                        </div>
                        <div className="token-to-fait">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swap-footer">
                {walletConnectState ? (
                    <button
                        onClick={originTokenBalance < originTokenState ? swap : swap}
                        className={insufficentState === "Swap" ? "swap" : "enter-an-amount"}
                    >
                        <p>{insufficentState}</p>
                    </button>
                ) : (
                    <button className="connected" onClick={connectWallet}>
                        <p>Connect wallet</p>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Swap;
