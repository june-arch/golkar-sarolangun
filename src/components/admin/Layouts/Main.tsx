
import React from "react"
import { Header } from "../Header"
import { Sidenav } from "../Sidenav"

export const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Sidenav />
            <Header />
            {children}  
        </>
    )
}