import { MenuProvider } from "@/context/Menu.context"
import React from "react"

import { Header } from "../header/Header"
import { Sidenav } from "../sidenav/Sidenav"

export const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <MenuProvider>
            <Sidenav />
            <Header />
            {children}
        </MenuProvider>
    )
}