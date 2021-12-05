import { useContext } from "react";
import { AppContext } from "../../store/index";

const AssetsInWallet = () => {
    const context = useContext(AppContext);
    const closeModal = () => {
        context.toggleWallet();
    };
    const selectToken = (index: number) => {
        context.changeOriginToken(index);
        context.changeOriginTokenBalance(context.wallet[context.walletIndex].assets[index].balance);
    };
    return (
        <div className="modal">
            <div className="tokens-in-wallet-modal">
                <div className="modal-contents">
                    <div className="title">
                        <h2>Tokens</h2>
                        <button className="closeModal" onClick={closeModal}>
                            <p>X</p>
                        </button>
                    </div>
                    <hr className="modal-hr" />
                    <div className="token-list">
                        {context.wallet[context.walletIndex].assets.map((token: any, index: any) => (
                            <div className="token" key={index} onClick={() => selectToken(index)}>
                                <div className="token-icon">
                                    <img src={`${token.iconUrl}`} alt="token-icon" key={index.iconUrl} />
                                </div>
                                <p key={token.symbol}>{token.symbol}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetsInWallet;
