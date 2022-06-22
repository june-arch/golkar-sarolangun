import React, { useState } from "react"

import { MenuContext } from "@/context/menu/Menu.context"

import { Header } from "../header/Header"
import { Sidenav } from "../sidenav/Sidenav"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    return (
        <MenuContext.Provider value={{ open, setOpen }}>
            <Sidenav />
            <Header />
            {children}
        </MenuContext.Provider>
    )
}