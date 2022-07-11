import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { navData } from "@/lib/resource/side-nav-data-admin";
import { selectOpen, setOpen } from "@/lib/redux/slice/navigation-slice-admin";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";

export const Sidenav = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpen);
  return (
    <>
      <div
        onClick={() => dispatch(setOpen(!open))}
        className={`fixed inset-y-0 inset-x-0 ${open ? "translate-x-0" : "-translate-x-full"}  transition-all duration-75 bg-[#3a3a3a70]`}
      />
      <div
        className={`fixed w-80 z-50  bg-gray-600 h-full ${open ? "translate-x-0" : "-translate-x-full"} transform transition-all duration-300 overflow-y-auto`}
      >
        <div className="flex space-x-3 items-center justify-center p-10">
          <button className="absolute right-4" onClick={() => dispatch(setOpen(!open))}>
            <XIcon className="h-8 w-8 text-gray-50" />
          </button>
          <Link href="/">
            <a>
              <span className="text-2xl text-yellow-500">GOLKAR SAROLANGUN</span>
            </a>
          </Link>
        </div>
        {navData.menuItems.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2 mb-2">
            {item.items.map(({ seconTitle, title, icon }, index) => (
              <div key={index} className="text-gray-50 flex flex-col">
                {seconTitle && (
                  <span className="pl-5 text-gray-400">{seconTitle}</span>
                )}
                {title && (
                  <Link href="/">
                    <a
                      className="flex space-x-4 items-center p-4 hover:bg-gray-500 text-gray-50"
                      onClick={() => dispatch(setOpen(!open))}
                    >
                      <span>{icon}</span>
                      <span className="text-lg capitalize ">{title}</span>
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
