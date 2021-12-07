import { useContext } from "react";
import { AppContext } from "../store/index";
import { Link } from "react-router-dom";
const UserWallet = () => {
    const context = useContext(AppContext);
    return (
        <div className="user-wallet-contents">
            <Link to="/">Back to RamenSwap</Link>
        </div>
    );
};

export default UserWallet;
