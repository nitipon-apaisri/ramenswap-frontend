import { createContext } from "react";

const wallet = [
    {
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
};
const AppContext = createContext<Partial<ContextProps>>({});

const AppProvider = (props: any) => {
    const mockWallet: object = wallet[0];
    // const [state, setState] = useState('s')
    return <AppContext.Provider value={{ mockWallet }}>{props.children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
