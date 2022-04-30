import Link from "next/link"
import { useState } from "react"

import { Menus } from "@/lib/types"

import MobileNavbar from './MobileNavbar'
import NextImage from '../NextImage'


type Data = {
    'nav-items': Menus[];
}

export default function Navbar(navItems: Data) {
    const [open, setOpen] = useState(false)
    const [openSub1, setOpenSub1] = useState({ state: false, posisi: 0 })
    const [openSub2, setOpenSub2] = useState({ state: false, posisiParent: 0, posisi: 0 })
    const handleLink = (value: string) => {
        const lower = value.toLowerCase();
        const remove = lower.replace(/\.|\,/g, ' ').trim();
        const result = remove.replace(/ +/g, '-');
        return result;
    }
    return (
        <nav className='flex flex-row py-4 px-6 2xl:bg-opacity-0 bg-yellow-300'>
            <MobileNavbar open={open} openSub1={openSub1} openSub2={openSub2} setOpen={setOpen} setOpenSub1={setOpenSub1} setOpenSub2={setOpenSub2} navItems={navItems} />
            <div className='basis-1/12 flex justify-end self-center'>
                <span className="border-r-2 border-black sm:border-white px-2 cursor-pointer">
                    <Link href='/'><a><div className='bg-local w-14 h-14 sm:mr-5 mr-1'>
                        <NextImage src='/images/logo.png' alt='logo-golkar' className="z-0" height={54} width={54} /></div></a>
                    </Link>
                </span>
            </div>
            <ol className='hidden xl:basis-6/12 md:basis-11/12 md:flex flex-row justify-evenly uppercase font-sans text-md text-slate-700 self-center'>
                {navItems['nav-items'].map((value, i) => {
                    return (
                        <li className="group cursor-pointer relative last-child-custom" key={i}>
                            <div className="md:text-xs lg:text-sm whitespace-nowrap transition-transform duration-300 transform">
                                <Link href={value.menu.toLowerCase().replace(/ /g, '-')}>
                                    <a><span>{value.menu}</span></a>
                                </Link>
                                <svg fill="currentColor" viewBox="0 0 20 20" className={`${value.subMenu.length > 0 ? '' : 'hidden'} inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 group-hover:rotate-180`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </div>
                            <ol className="hidden group-hover:block absolute whitespace-nowrap">
                                <div className="child-custom"><svg width="12" height="12" viewBox="0 0 50 43.3"><polygon points="0,43.3 25,0 50,43.3" fill="white" /></svg></div>
                                <div className="bg-white p-4 rounded-sm -mt-1 child-custom-second">
                                    {value.subMenu?.map((item, j) => {
                                        return (
                                            <li className="text-xs group-scope relative border-b-[1px] border-slate-400 py-2 last:border-b-0 last-subChild-custom" key={j}>
                                                <div className="flex flex-row ">
                                                    <Link href={item.subMenuName.toLowerCase().replace(/ /g, '-')}>
                                                        <a className="basis-11/12 "><span >{item.subMenuName}</span></a>
                                                    </Link>
                                                    <svg fill="currentColor" viewBox="0 0 20 20" className={`${item.subSubMenu.length > 0 ? '' : 'hidden'} basis-1/12  self-center inline w-4 h-4 -rotate-90`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </div>
                                                <ol className="hidden group-scope-hover:block absolute whitespace-nowrap pl-4 left-full top-0">
                                                    <div className={`${item.subSubMenu.length > 0 ? '' : 'hidden'} bg-white p-4 rounded-sm ${item.subSubMenu.length > 11 ? 'h-96' : ''} overflow-y-auto scrollbar-hide`}>
                                                        {item.subSubMenu?.map((isi, k) => {
                                                            return (
                                                                <li className="border-b-[1px] border-slate-400 last:border-b-0 py-2" key={k}>
                                                                    <Link href={handleLink(isi)}>
                                                                        <a>{isi}</a>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </div>
                                                </ol>
                                            </li>
                                        )
                                    })}
                                </div>
                            </ol>
                        </li>
                    )
                })}
            </ol>
            <div className='hidden basis-5/12 xl:flex justify-around self-center '>
                <div className="xl:w-96 self-center">
                    <div className="flex flex-row w-full rounded">
                        <input type="search" className="form-control flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                        <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className="basis-11/12 flex justify-between items-center md:hidden px-2">
                <div className="text-3xl text-black">
                    Partai Golkar
                </div>
                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out bg-black ${open ? "rotate-45 translate-y-3.5 " : ""}`} />
                    <span className={`h-1 w-full rounded-lg transition-all duration-300 ease-in-out bg-black ${open ? "w-0 bg-black" : "w-full "}`} />
                    <span className={`h-1 w-full rounded-lg transform transition duration-300 ease-in-out bg-black ${open ? "-rotate-45 -translate-y-3.5 " : ""}`} />
                </div>
            </div>
        </nav>
    )
}
