import { useContext, useState, useEffect } from "react";
import { AppContext } from "../store/index";
import { useNavigate } from "react-router-dom";
const UserWallet = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const [transactionsArr, updateTransactions]: any = useState([]);
    const backToRamenSwap = () => {
        navigate("/");
    };
    let tva = 0;
    if (context.wallet.length !== 0) {
        for (let i = 0; i < context.wallet[0].assets.length; i++) {
            tva += context.wallet[0].assets[i].balance * context.wallet[0].assets[i].currentPrice;
        }
    }
    useEffect(() => {
        updateTransactions(context.transactions);
    }, [context]);
    return context.wallet.length === 0 ? (
        <div className="user-wallet-contents">
            <div className="announcment">
                <div className="content">
                    <h1>Please "Sign In" to the app</h1>
                    <button onClick={backToRamenSwap}>
                        <p>Back to the app</p>
                    </button>
                </div>
            </div>
        </div>
    ) : (
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
                                <h1>{`$${tva}`}</h1>
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
                            <div className="number">
                                <h1>-</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tables">
                    <div className="transactions">
                        <div className="title">
                            <h2>Transactions</h2>
                        </div>
                        {transactionsArr.length !== 0 ? (
                            <div className="table">
                                <hr />
                                <div className="table-head">
                                    <div className="sender head">
                                        <h4>From</h4>
                                    </div>
                                    <div className="receiver head">
                                        <h4>To</h4>
                                    </div>
                                    <div className="amount head">
                                        <h4>Value</h4>
                                    </div>
                                    <div className="timestamp head">
                                        <h4>Timestamp</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="transactions-wrapper">
                                    {transactionsArr.map((transaction: any, index: any) => {
                                        return (
                                            <div className="row" key={index}>
                                                <p>{transaction.sender}</p>
                                                <p>{transaction.receiver}</p>
                                                {/*prettier-ignore*/}
                                                <p>{transaction.amount} {transaction.currency}</p>
                                                <p>{transaction.timeStamp}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="annoucement">
                                <h1>Coming Soon</h1>
                            </div>
                        )}
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
