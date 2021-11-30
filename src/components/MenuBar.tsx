import { useState } from "react";
import logo from "../assets/ramen.png";
import ethLogo from "../assets/eth.svg";
import otherIcon from "../assets/other.png";
const Menu = () => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index: number) => {
        setToggleState(index);
    };
    const getActiveClass = (index: number, className: string) => (toggleState === index ? className : "");

    return (
        <div className="menu-bar">
            <div className="banner">
                <img src={logo} alt="logo" />
                <h3>RamenSwap</h3>
            </div>
            <div className="menu-options">
                <p className={`option ${getActiveClass(1, "active")}`} onClick={() => toggleTab(1)}>
                    Swap
                </p>
                <p className={`option ${getActiveClass(2, "active")}`} onClick={() => toggleTab(2)}>
                    Transactions
                </p>
                <p className={`option ${getActiveClass(3, "active")}`} onClick={() => toggleTab(3)}>
                    Pool
                </p>
            </div>
            <div className="menu-actions">
                <div className="network">
                    <img src={ethLogo} alt="networkLogo" />
                    <p>Ethereum</p>
                </div>
                <div className="wallet">
                    <p>Connect wallet</p>
                </div>
                <div className="other">
                    <img src={otherIcon} alt="other" />
                </div>
            </div>
        </div>
    );
};

export default Menu;
