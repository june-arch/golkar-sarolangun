import { createContext,Dispatch, SetStateAction } from "react";

type typeOpen = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const valueOpen = {
    open: false,
    setOpen: (val: boolean) => val
} 

export const OpenContext = createContext<typeOpen>(valueOpen);

type typeToken = {
    token: any,
    setToken: Dispatch<SetStateAction<string>>
}

const valueToken = {
    token: null,
    setToken: (val: string) => val
} 
export const TokenContext = createContext<typeToken>(valueToken);

type typeTable = {
    pageState: {
        page: number,
        setPage: Dispatch<SetStateAction<number>>
    },
    limitState: {
        limit: number,
        setLimit: Dispatch<SetStateAction<number>>,
    },
    searchState: {
        search: string,
        setSearch: Dispatch<SetStateAction<string>>,
    }
}

const valueTable = {
    pageState: {
        page: 1,
        setPage: (val: number) => val,
    },
    limitState: {
        limit: 1,
        setLimit: (val: number) => val,
    },
    searchState: {
        search: '',
        setSearch: (val: string) => val,
    }
}

export const TableContext = createContext<typeTable>(valueTable);

type typeStateHomePage = {
    news: {
        data: any[],
        setData: Dispatch<SetStateAction<any[]>>
    },
    activity: {
        data: any[],
        setData: Dispatch<SetStateAction<any[]>>
    },
    navigation: {
        data: any[],
        setData: Dispatch<SetStateAction<any[]>>,
        open: boolean,
        setOpen: Dispatch<SetStateAction<boolean>>,
        openSub1: any,
        setOpenSub1: Dispatch<SetStateAction<any>>,
        openSub2: any,
        setOpenSub2: Dispatch<SetStateAction<any>>
    }
}

const valueStateHomePage = {
    news: {
        data: [],
        setData: (val: any[]) => val,
    },
    activity: {
        data: [],
        setData: (val: any[]) => val,
    },
    navigation: {
        data: [],
        setData: (val: any[]) => val,
        open: false,
        setOpen: (val: any) => val,
        openSub1: { state: false, posisi: 0 },
        setOpenSub1: (val: any) => val,
        openSub2: { state: false, posisiParent: 0, posisi: 0 },
        setOpenSub2: (val: any) => val,
    }
}

export const StateHomePage = createContext<typeStateHomePage>(valueStateHomePage);