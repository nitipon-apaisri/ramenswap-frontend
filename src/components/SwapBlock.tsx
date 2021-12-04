import { useState, useContext, useEffect } from "react";
import CaretDown from "../assets/CaretDown.png";
import CaretDownWhite from "../assets/CaretDownWhite.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AppContext } from "../store/index";

const Swap = () => {
    const context = useContext(AppContext);
    const [originTokenState, setOriginTokenState] = useState(0);
    const [originTokenCurrentPrice, setOriginTokenCurrentPrice] = useState(0);
    const [originTokenBalance, setOriginTokenBalance] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [originTokenSymbol, setOriginTokenSymbol] = useState("");
    const [insufficentState, setInsufficentState] = useState("");
    const [selectTokenState, setSelectTokenState] = useState(Boolean);
    const [tokenIndex, setTokenIndex] = useState(Number);
    const [originToken, setOriginToken] = useState(Number);
    const [tokenSelectIndexInWallet, setTokenInWalletIndex] = useState(Number);
    const [selectedTokenCurrentPrice, setSelectedTokenCurrentPrice] = useState(Number);
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
    const toggleWallet = () => {
        context.toggleWallet();
    };
    useEffect(() => {
        if (originTokenBalance < originTokenState) {
            setInsufficentState("Insufficent");
        } else if (originTokenState === 0 || null) {
            setInsufficentState("Enter an amount");
        } else {
            setInsufficentState("Swap");
        }
        setOriginTokenCurrentPrice(context.mockWallet.assets[context.originToken].currentPrice);
        setSelectedTokenCurrentPrice(context.supportTokens[context.tokenSelectIndex].currentPrice);
        setTokenInWalletIndex(context.tokenSelectIndexInWallet);
        setOriginToken(context.originToken);
        setTokenIndex(context.tokenSelectIndex);
        setSelectTokenState(context.selectTokenState);
        setOriginTokenBalance(context.originTokenBalance);
        setWalletConnectState(context.walletConnectState);
        setOriginTokenSymbol(context.originTokenSymbol);
    }, [
        context.tokenSelectIndexInWallet,
        context.originTokenBalance,
        context.walletConnectState,
        context.originTokenSymbol,
        context.selectTokenState,
        context.tokenSelectIndex,
        context.originToken,
        context.supportTokens,
        context.mockWallet,
        originTokenState,
        originTokenBalance,
        selectTokenState,
        selectedTokenCurrentPrice,
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
                            <button onClick={toggleWallet}>
                                <img
                                    src={context.mockWallet.assets[originToken].iconUrl}
                                    alt="token"
                                    className="tokenIcon"
                                />
                                <p>{context.mockWallet.assets[originToken].symbol}</p>
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
                                    {context.mockWallet.assets[originToken].symbol}
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <div className="token-to-fiat">
                            {originTokenState !== 0 ? (
                                <p>
                                    ≈
                                    {`$${
                                        originTokenState * context.mockWallet.assets[context.originToken].currentPrice
                                    }`}
                                </p>
                            ) : (
                                <p></p>
                            )}
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
                        {selectTokenState ? (
                            <input
                                type="number"
                                placeholder="0"
                                min="0"
                                disabled
                                value={(originTokenState * originTokenCurrentPrice) / selectedTokenCurrentPrice}
                            />
                        ) : (
                            <input type="number" placeholder="0" min="0" disabled value="0" />
                        )}
                    </div>
                    <div className="swap-input-footer">
                        <div className="balance">
                            {walletConnectState && selectTokenState ? (
                                tokenSelectIndexInWallet !== -1 ? (
                                    <p>
                                        Balance: {context.mockWallet.assets[tokenSelectIndexInWallet].balance}{" "}
                                        {context.mockWallet.assets[tokenSelectIndexInWallet].symbol}
                                    </p>
                                ) : (
                                    <p>Balance: 0</p>
                                )
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <div className="token-to-fait">
                            {selectTokenState ? <p>≈{`${originTokenState * originTokenCurrentPrice}`}</p> : <p></p>}
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
