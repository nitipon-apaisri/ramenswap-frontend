import { useContext } from "react";
import { AppContext } from "../store/index";

import CheckCircle from "../assets/CheckCircle.svg";
const SwapResult = () => {
    const context = useContext(AppContext);
    const close = () => {
        window.location.reload();
    };
    return (
        <div className="result-content">
            <img src={CheckCircle} alt="status" />
            <h4>Transansaction Submitted</h4>
            {/* <div className="result-describe">
                <p>{`Swap: ${context.transaction.originAmount} ${
                    context.wallet[context.walletIndex].assets[context.originToken].symbol
                } to ${context.transaction.swapAmount} ${
                    context.wallet[context.walletIndex].assets[context.tokenSelectIndexInWallet].symbol
                }`}</p>
            </div> */}
            <div className="result-footer">
                <button onClick={close}>
                    <p>Close</p>
                </button>
            </div>
        </div>
    );
};

export default SwapResult;
