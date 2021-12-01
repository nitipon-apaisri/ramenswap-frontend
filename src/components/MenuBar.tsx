import { useState } from "react";
import logo from "../assets/ramen.png";
import ethLogo from "../assets/eth.svg";
import otherIcon from "../assets/cicrle.svg";
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
                <button className={` ${getActiveClass(1, "active")}`} onClick={() => toggleTab(1)}>
                    <p>Swap</p>
                </button>
                <button className={` ${getActiveClass(2, "active")}`} onClick={() => toggleTab(2)}>
                    <p>Transactions</p>
                </button>
                <button disabled>
                    <p>Coming Soon</p>
                </button>
            </div>
            <div className="menu-actions">
                <div className="network">
                    <button>
                        <img src={ethLogo} alt="networkLogo" />
                        <p>Ethereum</p>
                    </button>
                </div>
                <div className="wallet">
                    <button>
                        <p>Connect wallet</p>
                    </button>
                </div>
                <div className="other">
                    <img src={otherIcon} alt="other" />
                </div>
            </div>
        </div>
    );
};

export default Menu;
