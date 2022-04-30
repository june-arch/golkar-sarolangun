/* eslint-disable unused-imports/no-unused-vars */
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { Menus } from '@/lib/types';

import NextImage from '../NextImage';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    navItems: Data;
    openSub1: OpenSub;
    openSub2: OpenSub2;
    setOpenSub1: Dispatch<SetStateAction<OpenSub>>;
    setOpenSub2: Dispatch<SetStateAction<OpenSub2>>;
}

type Data = {
    'nav-items': Menus[];
}

type OpenSub = {
    state: boolean;
    posisi: number;
}
type OpenSub2 = {
    state: boolean;
    posisiParent: number;
    posisi: number;
}

const MobileNavbar = (props: Props) => {
    const { open, setOpen, navItems, openSub1, openSub2, setOpenSub1, setOpenSub2 } = props
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    useEffect(() => {
        // only execute all the code below in client side
        const handleResize = () => {
            // Set window width/height to state
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    useEffect(() => {
        //manipulate element every update openSub1
        const elementButtonMenu1 = document.getElementById('buttonMenu1-' + openSub1.posisi);
        const elementButtonTrans = document.getElementById('subMenu1-' + openSub1.posisi);
        if (!elementButtonTrans?.classList.contains('!translate-y-0')) {
            elementButtonTrans?.classList.add('!translate-y-0')
            elementButtonMenu1?.classList.add('rotate-180')
            if (elementButtonTrans) {
                for (let i = 0; i < elementButtonTrans.children.length; i++) {
                    elementButtonTrans.children.item(i)?.classList.add('!block')
                }
            }
        } else {
            elementButtonTrans?.classList.remove('!translate-y-0')
            elementButtonMenu1?.classList.remove('rotate-180')
            if (elementButtonTrans) {
                for (let i = 0; i < elementButtonTrans.children.length; i++) {
                    elementButtonTrans.children.item(i)?.classList.remove('!block')
                }
            }
        }
    }, [openSub1])

    useEffect(() => {

        //manipulate element every update openSub2
        const elementButtonMenu1 = document.getElementById('buttonMenu2-' + openSub2.posisiParent + '-' + openSub2.posisi);
        const elementButtonTrans2 = document.getElementById('subMenu2-' + openSub2.posisiParent + '-' + openSub2.posisi);
        if (!elementButtonTrans2?.classList.contains('!translate-y-0')) {
            elementButtonTrans2?.classList.add('!translate-y-0')
            elementButtonMenu1?.classList.add('rotate-180')
            if (elementButtonTrans2) {
                for (let i = 0; i < elementButtonTrans2.children.length; i++) {
                    elementButtonTrans2.children.item(i)?.classList.add('!block')
                }
            }
        } else {
            elementButtonTrans2?.classList.remove('!translate-y-0')
            elementButtonMenu1?.classList.remove('rotate-180')
            if (elementButtonTrans2) {
                for (let i = 0; i < elementButtonTrans2.children.length; i++) {
                    elementButtonTrans2.children.item(i)?.classList.remove('!block')
                }
            }
        }
    }, [openSub2])
    return (
        <div className={`z-50 absolute top-0 left-0 h-screen  w-full bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <div className="text-xl font-semibold cursor-pointer" >
                    <Link href="/"><a><div className='bg-local w-16 h-16 mr-5'><NextImage src='/images/logo.png' alt='logo-golkar' className="z-40" height={104} width={104} /></div></a></Link>
                </div>
            </div>
            <div className="flex flex-col mx-6 py-4 pb-24 h-full overflow-auto scrollbar-hide">
                {navItems['nav-items'].map((value, i) => {
                    return (
                        <div key={i} className="text-sm py-2 font-medium">
                            <div className='flex'>
                                <button className='grow-0 uppercase'>{value.menu}</button>
                                <div className='grow' onClick={() => setOpenSub1({ state: !openSub1.state, posisi: i })}>
                                    <div className='flex justify-end pr-4'>
                                        <svg id={`buttonMenu1-${i}`} fill="currentColor" viewBox="0 0 20 20" className={`${value.subMenu.length > 0 ? '' : 'hidden'} inline w-4 h-4 mt-1 ml-1`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-1 border-slate-200 mt-2 mr-4" />
                            <div className="overflow-auto scrollbar-hide">
                                <div id={`subMenu1-${i}`} className={` -translate-y-96 transition-all ease-in-out delay-0 duration-300 transform`}>
                                    {value?.subMenu.map((item, j) => {
                                        return (
                                            <div key={j} className="hidden pl-2 py-2">
                                                <div className='flex'>
                                                    <button className='grow-0 uppercase text-left' >{item.subMenuName}</button>
                                                    <div className='grow' onClick={() => setOpenSub2({ state: !openSub2.state, posisiParent: i, posisi: j })}>
                                                        <div className='flex justify-end'>
                                                            <svg id={`buttonMenu2-${i}-${j}`} fill="currentColor" viewBox="0 0 20 20" className={`${item.subSubMenu.length > 0 ? '' : 'hidden'} inline w-4 h-4 mt-1 ml-1`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="border-1 border-slate-200 mt-2" />
                                                <div className="overflow-auto scrollbar-hide">
                                                    <div id={`subMenu2-${i}-${j}`} className=' -translate-y-96 transition-all ease-in-out delay-0 duration-300 transform'>
                                                        {item?.subSubMenu.map((isi, k) => {
                                                            return (
                                                                <div key={k} className='hidden pl-4 py-2'>
                                                                    <div className='flex'>
                                                                        <button className='grow-0 uppercase text-left' >{isi}</button>
                                                                        <div className='grow' onClick={() => setOpenSub2({ state: !openSub2.state, posisiParent: i, posisi: j })}></div>
                                                                    </div>
                                                                    <hr className="border-1 border-slate-200 mt-2" />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileNavbar