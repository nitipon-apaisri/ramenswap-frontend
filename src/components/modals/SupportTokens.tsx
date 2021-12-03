import { useContext, useEffect, useState } from "react";
// import { useContext } from "react";
import { AppContext } from "../../store/index";

const Tokens = () => {
    const context = useContext(AppContext);
    const [originTokenSelectedState, setOriginTokenSelectedState] = useState(Number);
    const closeModal = () => {
        context.toggleSupportTokens();
    };
    const selectToken = (index: number, contractAddress: string) => {
        context.checkTokenInWallet(contractAddress);
        context.changeSelectToken(index);
        context.toggleSupportTokens();
    };
    useEffect(() => {
        setOriginTokenSelectedState(context.originToken);
    }, [context.originToken]);
    return (
        <div className="modal">
            <div className="support-token-modal">
                <div className="modal-contents">
                    <div className="title">
                        <h2>Tokens</h2>
                        <button className="closeModal" onClick={closeModal}>
                            <p>X</p>
                        </button>
                    </div>
                    <hr className="modal-hr" />
                    <div className="token-list">
                        {context.supportTokens.map((token: any, index: any) => {
                            return (
                                <button
                                    className={`token ${
                                        context.mockWallet.assets[originTokenSelectedState].contractAddress ===
                                        token.contractAddress
                                            ? "selected"
                                            : ""
                                    }`}
                                    key={index}
                                    disabled={
                                        context.mockWallet.assets[originTokenSelectedState].contractAddress ===
                                        token.contractAddress
                                            ? true
                                            : false
                                    }
                                    onClick={() => selectToken(index, token.contractAddress)}
                                >
                                    <div className="token-icon">
                                        <img src={`${token.iconUrl}`} alt="token-icon" key={index.iconUrl} />
                                    </div>
                                    <p key={token.symbol}>{token.symbol}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tokens;
