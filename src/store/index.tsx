import axios from "axios";
import { createContext, useState } from "react";

const wallet = [
    {
        password: "defi",
        assets: [
            {
                symbol: "ETH",
                name: "Ethereum",
                contractAddress: "0x",
                iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
                balance: 1000,
                currentPrice: 4000,
                publicKey: "0xxGA9kcKGmlSSPxguPwgKIsPi67jEf7HDZW6HoIy2",
                privateKey: "0xETHP",
            },
            {
                symbol: "USDT",
                name: "US Dollar Tether",
                iconUrl: "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                currentPrice: 1,
                publicKey: "0xhHvmz5vLV3D8VQSv6HSWRIjN2adbz9ID4ksKTaAR",
                privateKey: "0xUSDTP",
            },
        ],
    },
];

const supportTokens: any = [];

type ContextProps = {
    mockWallet: any;
    wallet: any;
    walletIndex: any;
    supportTokens: any;
    originTokenBalance: any;
    walletConnectState: any;
    originTokenSymbol: any;
    selectTokenState: any;
    tokenSelectIndex: any;
    walletState: any;
    originToken: any;
    tokenSelectIndexInWallet: any;
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
    checkTokenInWallet: any;
};
const AppContext = createContext<Partial<ContextProps>>({});

axios.get("http://localhost:4200/assets").then((r) => {
    if (r.data.assets.length !== supportTokens) {
        r.data.assets.forEach((token: object) => supportTokens.push(token));
    }
});

const AppProvider = (props: any) => {
    const [originTokenBalance, setOriginTokenBalance] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [walletIndex, setWalletIndex] = useState(Number);
    const [originTokenSymbol, setOriginTokenSymbol] = useState("");
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    const [selectTokenState, setSelectTokenState] = useState(false);
    const [tokenSelectIndex, setTokenSelectIndex] = useState(Number);
    const [tokenSelectIndexInWallet, setTokenInWalletIndex] = useState(-1);
    const [walletState, setWalletState] = useState(false);
    const [originToken, setOriginToken] = useState(Number);
    const changeOriginTokenBalance = (balance: number) => {
        setOriginTokenBalance(balance);
    };
    const changeWalletConnectState = (state: boolean, walletIndex: number) => {
        setWalletConnectState(state);
        console.log(walletIndex);
        setWalletIndex(walletIndex);
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
    const checkTokenInWallet = (contractAddress: string) => {
        const token = wallet[0].assets.findIndex((r) => r.contractAddress === contractAddress);
        setTokenInWalletIndex(token);
    };
    const mockWallet: object = wallet[0];
    return (
        <AppContext.Provider
            value={{
                mockWallet,
                wallet,
                walletIndex,
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
                tokenSelectIndexInWallet,
                changeWalletConnectState,
                changeOriginTokenBalance,
                changeOriginTokenSymbol,
                changeSelectToken,
                toggleConnectWallet,
                toggleSupportTokens,
                toggleWallet,
                changeOriginToken,
                checkTokenInWallet,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
