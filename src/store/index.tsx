import axios from "axios";
import { createContext, useState } from "react";

const wallet: any = [];

const supportTokens: any = [];
axios.get("http://localhost:4200/assets").then((r) => {
    if (r.data.assets.length !== supportTokens) {
        r.data.assets.forEach((token: object) => supportTokens.push(token));
    }
});
type ContextProps = {
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
    swapToken: any;
    signIn: any;
};
const AppContext = createContext<Partial<ContextProps>>({});

const AppProvider = (props: any) => {
    const [originTokenBalance, setOriginTokenBalance] = useState(0);
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [walletIndex, setWalletIndex] = useState(Number);
    const [originTokenSymbol, setOriginTokenSymbol] = useState("");
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    const [selectTokenState, setSelectTokenState] = useState(false);
    const [tokenSelectIndex, setTokenSelectIndex] = useState(0);
    const [tokenSelectIndexInWallet, setTokenInWalletIndex] = useState(-1);
    const [walletState, setWalletState] = useState(false);
    const [originToken, setOriginToken] = useState(Number);
    const changeOriginTokenBalance = (balance: number) => {
        setOriginTokenBalance(balance);
    };
    const changeWalletConnectState = (state: boolean, walletIndex: number) => {
        setWalletConnectState(state);
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
        if (wallet.length !== 0) {
            const token = wallet[0].assets.findIndex((r: any) => r.contractAddress === contractAddress);
            setTokenInWalletIndex(token);
        }
    };
    const swapToken = (swapAmount: number) => {
        wallet[walletIndex].assets[originToken].balance = originTokenBalance;
        wallet[walletIndex].assets[1].balance += swapAmount;
    };
    const signIn = (tokenPublicKey: string) => {
        axios
            .get(`http://localhost:4200/wallets/${tokenPublicKey}`)
            .then((r) => {
                wallet.push(r.data.wallet);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <AppContext.Provider
            value={{
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
                swapToken,
                signIn,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
