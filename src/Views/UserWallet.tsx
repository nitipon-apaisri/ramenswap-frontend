import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserWallet = () => {
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
                                <h1>4</h1>
                            </div>
                        </div>
                        <div className="display-block tva">
                            <h4>Coming Soon</h4>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserWallet;
