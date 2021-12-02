import { createContext, useState } from "react";

const wallet = [
    {
        usename: "coin",
        password: "defi",
        assets: [
            {
                symbol: "ETH",
                name: "Ethereum",
                contractAddress: "0x",
                balance: 1000,
                publicKey: "0xETH",
                privateKey: "0xETHP",
            },
            {
                symbol: "USDT",
                name: "US Dollar Tether",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: "0xUSDT",
                privateKey: "0xUSDTP",
            },
        ],
    },
];

type ContextProps = {
    mockWallet: any;
    originTokenBalance: any;
    walletConnectState: any;
    originTokenSymbol: any;
    connectWalletModalState: any;
    changeOriginTokenBalance: any;
    changeWalletConnectState: any;
    changeOriginTokenSymbol: any;
    toggleConnectWallet: any;
};
const AppContext = createContext<Partial<ContextProps>>({});

const AppProvider = (props: any) => {
    const [originTokenBalance, setOriginTokenBalance] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [originTokenSymbol, setOriginTokenSymbol] = useState("");
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const changeOriginTokenBalance = (balance: number) => {
        setOriginTokenBalance(balance);
    };
    const changeWalletConnectState = (state: boolean) => {
        setWalletConnectState(state);
    };
    const changeOriginTokenSymbol = (symbol: string) => {
        setOriginTokenSymbol(symbol);
    };
    const toggleConnectWallet = () => {
        setConnectWalletModalState(!connectWalletModalState);
    };
    const mockWallet: object = wallet[0];
    // const [state, setState] = useState('s')
    return (
        <AppContext.Provider
            value={{
                mockWallet,
                originTokenBalance,
                walletConnectState,
                originTokenSymbol,
                connectWalletModalState,
                changeWalletConnectState,
                changeOriginTokenBalance,
                changeOriginTokenSymbol,
                toggleConnectWallet,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
