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
                iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
                balance: 1000,
                publicKey: "0xETH",
                privateKey: "0xETHP",
            },
            {
                symbol: "USDT",
                name: "US Dollar Tether",
                iconUrl: "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: "0xUSDT",
                privateKey: "0xUSDTP",
            },
        ],
    },
];

const supportTokens = [
    {
        symbol: "UNI",
        name: "Uniswap",
        color: "#ff007a",
        iconUrl: "https://cdn.coinranking.com/1heSvUgtl/uniswap-v2.svg?size=48x48",
        contractAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    },
    {
        symbol: "1INCH",
        name: "1inch Token",
        color: "#ed6758",
        iconUrl: "https://cdn.coinranking.com/OypO2Qln6/1inch_token.png",
        contractAddress: "0x111111111117dc0aa78b770fa6a738034120c302",
    },
];

type ContextProps = {
    mockWallet: any;
    supportTokens: any;
    originTokenBalance: any;
    walletConnectState: any;
    originTokenSymbol: any;
    selectTokenState: any;
    tokenSelectIndex: any;
    walletState: any;
    originToken: any;
    connectWalletModalState: any;
    supportTokenModalState: any;
    changeOriginTokenBalance: any;
    changeWalletConnectState: any;
    changeOriginTokenSymbol: any;
    changeSelectToken: any;
    toggleConnectWallet: any;
    toggleSupportTokens: any;
    toggleWallet: any;
    changeOriginToken: any;
};
const AppContext = createContext<Partial<ContextProps>>({});

const AppProvider = (props: any) => {
    const [originTokenBalance, setOriginTokenBalance] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [originTokenSymbol, setOriginTokenSymbol] = useState("");
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    const [selectTokenState, setSelectTokenState] = useState(false);
    const [tokenSelectIndex, setTokenSelectIndex] = useState(Number);
    const [walletState, setWalletState] = useState(false);
    const [originToken, setOriginToken] = useState(Number);
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
    const toggleSupportTokens = () => {
        setSupportTokenModalState(!supportTokenModalState);
    };
    const toggleWallet = () => {
        setWalletState(!walletState);
    };
    const changeSelectToken = (index: number) => {
        setTokenSelectIndex(index);
        setSelectTokenState(true);
    };
    const changeOriginToken = (index: number) => {
        setOriginToken(index);
        setWalletState(!walletState);
    };
    const mockWallet: object = wallet[0];
    // const [state, setState] = useState('s')
    return (
        <AppContext.Provider
            value={{
                mockWallet,
                supportTokens,
                originTokenBalance,
                walletConnectState,
                originTokenSymbol,
                connectWalletModalState,
                supportTokenModalState,
                selectTokenState,
                tokenSelectIndex,
                walletState,
                originToken,
                changeWalletConnectState,
                changeOriginTokenBalance,
                changeOriginTokenSymbol,
                changeSelectToken,
                toggleConnectWallet,
                toggleSupportTokens,
                toggleWallet,
                changeOriginToken,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
