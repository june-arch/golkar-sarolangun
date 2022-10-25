import { useContext, useEffect, useState } from "react"

import { TokenContext } from "./use-context";
import { getWithExpiration } from "../db/local-storage";

export const useCheckTokenLogin = () => {
    const [loading, setLoading] = useState(true);
    const {token, setToken} = useContext(TokenContext);
    useEffect(()=>{
        const data = getWithExpiration('token-auth');
        let timer1 = setTimeout(() => {
            setLoading(false);
            setToken(data);
        }, token ? 500 : 3 * 1000);
        return () => {
            clearTimeout(timer1);
        }
    },[])
    return {
        isLoading: loading,
        data: token,
    }
}