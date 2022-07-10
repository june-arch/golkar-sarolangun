import { Menu } from "@headlessui/react";
import { MenuIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { headerRightItemsLogin } from "@/lib/utils/headerRight/headerRightItems";

import { useMenuContext } from "@/context/Menu.context";
import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { selectIsLogin, setIsLogin, setToken } from "@/context/auth-slice";
import { useRouter } from "next/router";


export const Header = () => {
  const dispatch = useAppDispatch();
  const { setOpen } = useMenuContext();
  const isLogin = useAppSelector(selectIsLogin);
  const router = useRouter();
  const handleLogout = (e, path: string) => {
    setTimeout(() => {
      dispatch(setIsLogin(false));
      dispatch(setToken(null));  
    }, 1000);
    return router.push(path);
  }
  const menuIsLogin = () => {
    const layout = (
      <Menu>
        <Menu.Button className="flex px-10 py-2 border-gray-50 border-2 space-x-3 text-gray-50  rounded-md">
          <UserIcon className="h-5 w-5 " />
          <span>Account</span>
        </Menu.Button>
        <Menu.Items
          as="div"
          className="absolute top-full bg-gray-600 w-full flex space-y-2 flex-col "
        >
          {headerRightItemsLogin.map(({ title, icon, link }, index) => (
            <Menu.Item key={index}>
              <a onClick={(e) => handleLogout(e, link)} className="flex p-4 hover:bg-gray-500 text-gray-50 space-x-3">
                <span>{icon}</span>
                <span>{title}</span>
              </a>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    )
    return layout;
  }

  const menuIsLogout = () => {
    const layout = (
      <Link href="/admin/login">
        <a className="flex px-10 py-2 border-gray-50 border-2 space-x-3 text-gray-50  rounded-md">
          <UserIcon className="h-5 w-5 " />
          <span>Login</span>
        </a>
      </Link>
    )
    return layout;
  }


  return (
    <div className="bg-gray-600 p-10 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-around">
      <div className="flex space-x-3 items-center justify-center">
        <button onClick={() => setOpen(true)}>
          <MenuIcon className="h-8 w-8 text-gray-50" />
        </button>
        <Link href="/admin">
          <a>
            <span className="text-3xl text-yellow-500">GOLKAR SAROLANGUN</span>
          </a>
        </Link>
      </div>
      <div className="relative">
        {isLogin ? menuIsLogin() : menuIsLogout()}
      </div>
    </div>
  );
};
