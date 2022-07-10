import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface Menu {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
  token: string;
}

const Context = createContext<Menu>({
  open: false,
  isLogin: false,
  setIsLogin: (val: SetStateAction<boolean>) => val,
  setOpen: (val: SetStateAction<boolean>) => val,
  setToken: (val: SetStateAction<string>) => val,
  token: '',
});

export function MenuProvider({children}) {
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState('');
  return (
    <Context.Provider value={{open, setOpen, isLogin, setIsLogin, token, setToken}}>{children}</Context.Provider>
  )
}

export function useMenuContext() {
  return useContext(Context);
}