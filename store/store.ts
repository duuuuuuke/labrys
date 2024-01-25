import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Token = {
    id: number;
    rank: number;
    img: string;
    symbol: string;
    marketCap: number;
    price: number;
    percentChange: number;
};

export type State = {
    myTokens: Token[];
    addToken: (token: Token) => void;
    removeToken: (id: number) => void;
    updateToken: (id: number, token: Token) => void;
};

export const useTokenStore = create(
    persist<State>(
        (set) => ({
            myTokens: [],
            addToken: (token: Token) =>
                set((state: State) => ({
                    myTokens: [...state.myTokens, token]
                })),
            removeToken: (id: number) =>
                set((state: State) => ({
                    myTokens: state.myTokens.filter((t) => t.id !== id)
                })),
            updateToken: (id: number, token: Token) =>
                set((state: State) => ({
                    myTokens: state.myTokens.map((t) =>
                        t.id === id ? token : t
                    )
                }))
        }),
        {
            name: "myTokens"
        }
    )
);
