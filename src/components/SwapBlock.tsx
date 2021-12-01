import { useState } from "react";
import CaretDown from "../assets/CaretDown.png";
import CaretDownWhite from "../assets/CaretDownWhite.svg";
import ArrowDown from "../assets/ArrowDown.svg";
const assets: any = [
    {
        symbol: "ETH",
        name: "Ethereum",
        color: "#3C3C3D",
        iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
        contractAddress: "0x",
        balance: 0,
        publicKey: "0xETH",
    },
];

const Swap = () => {
    const [originTokenState, setOriginTokenState] = useState(0);
    const setOriginTokenInputState = (value: any) => {
        setOriginTokenState(value);
        console.log(originTokenState);
    };
    return (
        <div className="swap-contents">
            <div className="content-header">
                <h4>Swap</h4>
            </div>
            <div className="swap-inputs">
                <div className="originToken">
                    <div className="main-content">
                        <div className="tokenSelect">
                            <button>
                                <img src={assets[0].iconUrl} alt="token" className="tokenIcon" />
                                <p>ETH</p>
                                <img src={CaretDown} alt="caret-down" className="caretDown" />
                            </button>
                        </div>
                        <input
                            type="number"
                            placeholder="0"
                            onChange={(e) => setOriginTokenInputState(e.target.value)}
                        />
                    </div>
                </div>
                <div className="tranfer">
                    <div className="tranfer-icon">
                        <img src={ArrowDown} alt="tranfer-icon" />
                    </div>
                </div>
                <div className="destinationToken">
                    <div className="main-content">
                        {/* <div className="tokenSelect">
                            <button>
                                <img src={assets[0].iconUrl} alt="token" className="tokenIcon" />
                                <p>ETH</p>
                                <img src={CaretDown} alt="caret-down" className="caretDown" />
                            </button>
                        </div> */}
                        <div className="choose-a-token">
                            <button>
                                <p>Select a token</p>
                                <img src={CaretDownWhite} alt="caret-down" className="caretDown" />
                            </button>
                        </div>
                        <input
                            type="number"
                            placeholder="0"
                            onChange={(e) => setOriginTokenInputState(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="swap-footer">
                <button>
                    <p>Connect wallet</p>
                </button>
            </div>
        </div>
    );
};

export default Swap;
