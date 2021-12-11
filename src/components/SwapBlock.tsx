import { useState, useContext, useEffect } from "react";
import CaretDown from "../assets/CaretDown.png";
import CaretDownWhite from "../assets/CaretDownWhite.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AppContext } from "../store/index";

const Swap = () => {
    const context = useContext(AppContext);
    const [insufficentState, setInsufficentState] = useState("");
    const [originTokenState, setOriginTokenState] = useState(0);
    const [originTokenCurrentPrice, setOriginTokenCurrentPrice] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [selectTokenState, setSelectTokenState] = useState(Boolean);
    const [tokenSelectIndexInWallet, setTokenInWalletIndex] = useState(Number);
    const [selectedTokenCurrentPrice, setSelectedTokenCurrentPrice] = useState(Number);
    const setOriginTokenInputState = (value: any) => {
        setOriginTokenState(Number(value));
    };

    const connectWallet = () => {
        context.toggleConnectWallet();
    };

    const swap = () => {
        context.swapToken((originTokenState * originTokenCurrentPrice) / selectedTokenCurrentPrice, originTokenState);
    };

    const toggleSupportTokens = () => {
        context.toggleSupportTokens();
    };
    const toggleWallet = () => {
        context.toggleWallet();
    };
    useEffect(() => {
        if (context.wallet.length !== 0) {
            if (context.wallet[context.walletIndex].assets[context.originToken].balance < originTokenState) {
                setInsufficentState("Insufficent");
            } else if (originTokenState === 0 || null) {
                setInsufficentState("Enter an amount");
            } else {
                setInsufficentState("Swap");
            }
        }
        if (context.supportTokens.length !== 0) {
            setSelectedTokenCurrentPrice(context.supportTokens[context.tokenSelectIndex].currentPrice);
        }
        if (context.wallet.length !== 0) {
            setOriginTokenCurrentPrice(context.wallet[context.walletIndex].assets[context.originToken].currentPrice);
        }
        setTokenInWalletIndex(context.tokenSelectIndexInWallet);
        setSelectTokenState(context.selectTokenState);
        setWalletConnectState(context.walletConnectState);
    }, [
        context.tokenSelectIndexInWallet,
        context.walletConnectState,
        context.selectTokenState,
        context.tokenSelectIndex,
        context.originToken,
        context.supportTokens,
        context.walletIndex,
        context.wallet,
        originTokenState,
        selectTokenState,
        selectedTokenCurrentPrice,
    ]);

    return (
        <div className="swap-contents">
            <div className="content-header">
                <h4>SWAP</h4>
            </div>
            <div className="swap-inputs">
                <div className="origin-token">
                    <div className="main-content">
                        {context.wallet.length !== 0 && context.walletConnectState ? (
                            <div className="tokenSelect">
                                <button onClick={toggleWallet}>
                                    <img
                                        src={context.wallet[context.walletIndex].assets[context.originToken].iconUrl}
                                        alt="token"
                                        className="tokenIcon"
                                    />
                                    <p>{context.wallet[context.walletIndex].assets[context.originToken].symbol}</p>
                                    <img src={CaretDown} alt="caret-down" className="caretDown" />
                                </button>
                            </div>
                        ) : context.supportTokens.length !== 0 ? (
                            <div className="tokenSelect">
                                <button onClick={toggleSupportTokens}>
                                    <img
                                        src={context.supportTokens[context.originToken].iconUrl}
                                        alt="token"
                                        className="tokenIcon"
                                    />
                                    <p>{context.supportTokens[context.originToken].symbol}</p>
                                    <img src={CaretDown} alt="caret-down" className="caretDown" />
                                </button>
                            </div>
                        ) : (
                            <div className="tokenSelect">
                                <button onClick={toggleSupportTokens}>
                                    <img
                                        src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
                                        alt="token"
                                        className="tokenIcon"
                                    />
                                    <p>ETH</p>
                                    <img src={CaretDown} alt="caret-down" className="caretDown" />
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
                            {walletConnectState ? (
                                <p>
                                    Balance: {context.wallet[context.walletIndex].assets[context.originToken].balance}{" "}
                                    {context.wallet[context.walletIndex].assets[context.originToken].symbol}
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
                                        originTokenState *
                                        context.wallet[context.walletIndex].assets[context.originToken].currentPrice
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
                                        src={`${context.supportTokens[context.tokenSelectIndex].iconUrl}`}
                                        alt="token"
                                        className="tokenIcon"
                                    />
                                    <p>{context.supportTokens[context.tokenSelectIndex].symbol}</p>
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
                                        {`Balance: ${
                                            context.wallet[context.walletIndex].assets[tokenSelectIndexInWallet].balance
                                        } ${
                                            context.wallet[context.walletIndex].assets[tokenSelectIndexInWallet].symbol
                                        }`}
                                    </p>
                                ) : (
                                    <p>Balance: 0</p>
                                )
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <div className="token-to-fait">
                            {selectTokenState && originTokenState !== 0 ? (
                                /* prettier-ignore */
                                <p>{`≈ $${((originTokenState * originTokenCurrentPrice) / selectedTokenCurrentPrice) * selectedTokenCurrentPrice}`}</p>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="swap-footer">
                {walletConnectState ? (
                    <button
                        onClick={
                            context.wallet[context.walletIndex].assets[context.originToken].balance < originTokenState
                                ? swap
                                : swap
                        }
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
