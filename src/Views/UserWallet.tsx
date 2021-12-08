import { useContext } from "react";
import { AppContext } from "../store/index";
import { useNavigate } from "react-router-dom";
const UserWallet = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const backToRamenSwap = () => {
        navigate("/");
    };

    return (
        <div className="user-wallet-contents">
            <header>
                <button onClick={backToRamenSwap}>
                    <p>Back to RamenSwap</p>
                </button>
            </header>
            <div className="contents">
                <div className="overview">
                    <div className="title">
                        <h2>Overview</h2>
                    </div>
                    <div className="container">
                        <div className="display-block tva">
                            <h4>Total Value Assets</h4>
                            <hr />
                            <div className="number">
                                <h1>$25604</h1>
                            </div>
                        </div>
                        <div className="display-block tha">
                            <h4>Total Holding Assets</h4>
                            <hr />
                            <div className="number">
                                <h1>{context.wallet[0].assets.length}</h1>
                            </div>
                        </div>
                        <div className="display-block tva">
                            <h4>Coming Soon</h4>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="tables">
                    <div className="transactions">
                        <div className="title">
                            <h2>Transactions</h2>
                        </div>

                        <div className="transactions-wrapper">
                            <h1>Coming Soon</h1>
                        </div>
                    </div>
                    <div className="assets">
                        <div className="title">
                            <h2>Assets</h2>
                        </div>
                        <div className="table">
                            <hr />
                            <div className="table-head">
                                <h4>Name</h4>
                                <h4>Holding</h4>
                            </div>
                            <hr />
                            <div className="assets-wrapper">
                                {context.wallet[0].assets.map((asset: any, index: any) => {
                                    return (
                                        <div className="assets-in-wallet" key={`tokenName${index}`}>
                                            <div className="asset-name">
                                                <img src={asset.iconUrl} alt="token-img" />
                                                <p>{asset.name}</p>
                                            </div>
                                            <div className="asset-balance">
                                                <p>{`${asset.balance} ${asset.symbol}`}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserWallet;
