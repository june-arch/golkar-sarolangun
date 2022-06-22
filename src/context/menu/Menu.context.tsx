import { createContext, Dispatch, SetStateAction } from "react";
type DefaultValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>,
}
const defaultValue: DefaultValue = {
  open: true,
  setOpen: function (value: SetStateAction<boolean>): void {
    return this.setOpen(value);
  }
}
export const MenuContext = createContext(defaultValue)