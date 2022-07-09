import { createContext, useContext, useState } from "react";

interface Menu {
  open: boolean;
  setOpen: (value: boolean) => void;
  isLogin: boolean;
  setIsLogin:  (value: boolean) => void;
}

const Context = createContext<Menu>({
  open: false,  
  setOpen: (value: boolean) => { return value; },
  isLogin: false,  
  setIsLogin: (value: boolean) => { return value; }

});

export function MenuProvider({children}) {
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Context.Provider value={{open, setOpen, isLogin, setIsLogin}}>{children}</Context.Provider>
  )
}

export function useMenuContext() {
  return useContext(Context);
}