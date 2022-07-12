
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { selectExpirated, selectIsLogin, selectToken, setIsLogin, setToken } from "@/lib/redux/slice/auth-slice-admin";
import { useRouter } from "next/router";
import React from "react"
import { Header } from "../Header"
import { Sidenav } from "../Sidenav"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectIsLogin);
    const token = useAppSelector(selectToken);
    const expirated = useAppSelector(selectExpirated);
    const router = useRouter();
    if(!isLogin){
        // router.push('/admin/login');
        console.log("user tidak login");
    }
    if(!(token && (expirated && expirated != 0))) {
        console.log("token dan expirated tidak valid");
    }

    const now = new Date().getTime();
    const diff = Math.floor(((now - expirated)/1000)/60);
    if(diff > (60*12)) {
        dispatch(setIsLogin(false));
        dispatch(setToken(null));
        // router.push('/admin/login');
    }     
    
    
    return (
        <>
            <Sidenav />
            <Header />
            {children}  
        </>
    )
}