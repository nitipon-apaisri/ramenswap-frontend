import axios from "axios";
import { createContext, useState } from "react";

const wallet: any = [];

const supportTokens: any = [];
axios.get("http://localhost:4200/assets").then((r) => {
    if (r.data.assets.length !== supportTokens) {
        r.data.assets.forEach((token: object) => supportTokens.push(token));
    }
});
let transactions: any = [];
type ContextProps = {
    wallet: any;
    walletIndex: any;
    supportTokens: any;
    walletConnectState: any;
    selectTokenState: any;
    tokenSelectIndex: any;
    walletState: any;
    originToken: any;
    swapBlockState: any;
    signInInfo: any;
    transactions: any;
    tokenSelectIndexInWallet: any;
    connectWalletModalState: any;
    supportTokenModalState: any;
    changeWalletConnectState: any;
    changeSelectToken: any;
    toggleConnectWallet: any;
    toggleSupportTokens: any;
    toggleWallet: any;
    changeOriginToken: any;
    checkTokenInWallet: any;
    swapToken: any;
    signIn: any;
    swapResultState: any;
    transaction: any;
    createWallet: any;
    setSwapBlockState: any;
    setSwapResultState: any;
    setSelectTokenState: any;
};
const AppContext = createContext<Partial<ContextProps>>({});

const AppProvider = (props: any) => {
    const [walletConnectState, setWalletConnectState] = useState(false);
    const [walletIndex, setWalletIndex] = useState(Number);
    const [swapBlockState, setSwapBlockState] = useState(true);
    const [connectWalletModalState, setConnectWalletModalState] = useState(false);
    const [supportTokenModalState, setSupportTokenModalState] = useState(false);
    const [selectTokenState, setSelectTokenState] = useState(false);
    const [tokenSelectIndex, setTokenSelectIndex] = useState(0);
    const [tokenSelectIndexInWallet, setTokenInWalletIndex] = useState(-1);
    const [walletState, setWalletState] = useState(false);
    const [originToken, setOriginToken] = useState(Number);
    const [selectedTokenContractAddress, setSelectedTokenContractAddress] = useState("");
    const [transaction, setTransaction] = useState({
        swapAmount: 0,
        originAmount: 0,
    });
    const [signInInfo, setSingInInfo] = useState({
        ethPublicKey: "",
    });
    const [swapResultState, setSwapResultState] = useState(false);
    const changeWalletConnectState = (state: boolean, walletIndex: number) => {
        setWalletConnectState(state);
        setWalletIndex(walletIndex);
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

    const getWallet = (publickKey: string) => {
        axios
            .get(`http://localhost:4200/wallets/${publickKey}`)
            .then((r) => {
                wallet.push(r.data.wallet);
            })
            .catch((err) => {
                console.log(err);
            });
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
        setSelectedTokenContractAddress(contractAddress);
        if (wallet.length !== 0) {
            const token = wallet[0].assets.findIndex((r: any) => r.contractAddress === contractAddress);
            setTokenInWalletIndex(token);
        }
    };
    const swapToken = (swapAmount: number, originTokenInput: number) => {
        wallet[walletIndex].assets[originToken].balance -= originTokenInput;
        const originTokenPublicKey = wallet[walletIndex].assets[originToken].publicKey;
        setTimeout(() => {
            axios({
                method: "post",
                url: "http://localhost:4200/transactions/swapToken",
                headers: { "Content-Type": "application/json" },
                data: {
                    originTokenPublicKey: `${originTokenPublicKey}`,
                    tokenContractAddress: `${selectedTokenContractAddress}`,
                    originTokenInput: originTokenInput,
                    swapAmount: swapAmount,
                },
            })
                .then((r) => {
                    setSwapBlockState(false);
                    if (r.data.msg === "Swap Successfull") {
                        setSwapResultState(true);
                        setTransaction({ ...transaction, swapAmount: swapAmount, originAmount: originTokenInput });
                    }
                    wallet.shift();
                    getWallet(originTokenPublicKey);
                    axios.get("http://localhost:4200/transactions").then((r: any) => {
                        transactions = [];
                        r.data.transactions.find((x: any) => {
                            wallet[0].assets.find((z: any) => {
                                if (z.publicKey === x.sender || z.publicKey === x.receiver) {
                                    transactions.push(x);
                                }
                                return 0;
                            });
                            return 0;
                        });
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 500);
    };
    const signIn = (tokenPublicKey: string) => {
        if (wallet.length === 0) {
            getWallet(tokenPublicKey);
            axios.get("http://localhost:4200/transactions").then((r: any) => {
                r.data.transactions.find((x: any) => {
                    wallet[0].assets.find((z: any) => {
                        if (z.publicKey === x.sender || z.publicKey === x.receiver) {
                            transactions.push(x);
                        }
                        return 0;
                    });
                    return 0;
                });
            });
        }
    };

    const createWallet = (walletPassword: string) => {
        axios({
            method: "POST",
            url: "http://localhost:4200/wallets/create",
            data: {
                password: walletPassword,
            },
        })
            .then((r) => {
                if (r.data.msg === "Wallet created!") {
                    setSingInInfo({
                        ...signInInfo,
                        ethPublicKey: r.data.wallet.assets[0].publicKey,
                    });
                }
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
                walletConnectState,
                connectWalletModalState,
                supportTokenModalState,
                selectTokenState,
                tokenSelectIndex,
                walletState,
                originToken,
                tokenSelectIndexInWallet,
                swapResultState,
                swapBlockState,
                transaction,
                signInInfo,
                transactions,
                changeWalletConnectState,
                changeSelectToken,
                toggleConnectWallet,
                toggleSupportTokens,
                toggleWallet,
                changeOriginToken,
                checkTokenInWallet,
                swapToken,
                signIn,
                createWallet,
                setSwapBlockState,
                setSwapResultState,
                setSelectTokenState,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
