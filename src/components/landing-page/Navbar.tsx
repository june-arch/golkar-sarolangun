import { useState } from 'react'

import { Menus } from '@/helpers/interface/types'

import MobileNavbar from './MobileNavbar'
import Link from 'next/link'
import Image from 'next/image'
import css from '@/styles/nav.module.css'

type Data = {
  'nav-items': Menus[]
}

export default function Navbar(navItems: Data) {
  const [open, setOpen] = useState(false)
  const [openSub1, setOpenSub1] = useState({ state: false, posisi: 0 })
  const [openSub2, setOpenSub2] = useState({
    state: false,
    posisiParent: 0,
    posisi: 0,
  })
  return (
    <nav className="flex flex-row py-2 px-8 items-center">
      <MobileNavbar
        open={open}
        openSub1={openSub1}
        openSub2={openSub2}
        setOpenSub1={setOpenSub1}
        setOpenSub2={setOpenSub2}
        navItems={navItems}
      />
      <div className="flex basis-1/12 items-center cursor-pointer">
        <Link href="/">
            <a className="">
              <div className="h-[51px] w-[48px]">
                <Image
                  src="/images/logo.png"
                  alt="logo-golkar"
                  height={1200}
                  width={1149}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </a>
          </Link>
      </div>
      <ol className="text-md hidden self-center flex-row justify-evenly font-sans uppercase text-slate-700 md:flex md:basis-11/12 xl:basis-6/12">
        {navItems['nav-items'].map((value, i) => {
          return (
            <li
              className="group-one last-child-custom relative cursor-pointer"
              key={i}
            >
              <div className="transform whitespace-nowrap transition-transform duration-300 md:text-xs lg:text-sm">
                <Link href={'/' + value.slug}>
                  <a
                    className={`${
                      value.slug == '#disable' && 'pointer-events-none'
                    }`}
                  >
                    <span>{value.name}</span>
                  </a>
                </Link>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className={`${
                    value.subMenu.length > 0 ? '' : 'hidden'
                  } mt-1 ml-1 inline h-4 w-4 transform transition-transform duration-200 group-one-hover:rotate-180 md:-mt-1`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <ol className="absolute hidden whitespace-nowrap group-one-hover:block">
                <div className="child-custom">
                  <svg width="12" height="12" viewBox="0 0 50 43.3">
                    <polygon points="0,43.3 25,0 50,43.3" fill="white" />
                  </svg>
                </div>
                <div className="child-custom-second -mt-1 rounded-sm bg-white p-4">
                  {value.subMenu?.map((item, j) => {
                    return (
                      <li
                        className="group-two last-subChild-custom relative border-b-[1px] border-slate-400 py-2 text-xs last:border-b-0"
                        key={j}
                      >
                        <div className="flex flex-row ">
                          <Link href={'/' + item.slug}>
                            <a
                              className={`${
                                value.slug == '#disable' &&
                                'pointer-events-none'
                              } basis-11/12`}
                            >
                              <span>{item.name}</span>
                            </a>
                          </Link>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className={`${
                              item.subMenu.length > 0 ? '' : 'hidden'
                            } inline  h-4 w-4 basis-1/12 -rotate-90 self-center`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <ol className="group-two-hover:block absolute left-full top-0 hidden whitespace-nowrap pl-4">
                          <div
                            className={`${
                              item.subMenu.length > 0 ? '' : 'hidden'
                            } rounded-sm bg-white p-4 ${
                              item.subMenu.length > 11 ? 'h-96' : ''
                            } overflow-y-auto scrollbar-hide`}
                          >
                            {item.subMenu?.map((isi, k) => {
                              return (
                                <li
                                  className="border-b-[1px] border-slate-400 py-2 last:border-b-0"
                                  key={k}
                                >
                                  <Link href={'/' + isi.slug}>
                                    <a
                                      className={`${
                                        isi.slug == '#disable' &&
                                        'pointer-events-none'
                                      }`}
                                    >
                                      {isi.name}
                                    </a>
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
      <div className="hidden basis-5/12 xl:flex ">
        <div className="self-center xl:w-96">
          <div className="flex w-full flex-row rounded">
            <input
              type="search"
              className="form-control m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-700"
              id="basic-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="flex basis-11/12 items-center justify-between md:hidden">
        <div className="uppercase flex flex-col px-4 tracking-tighter">
          <span className="text-header font-[900] text-black">Partai Golkar</span>
          <span className="text-header-sub font-[900] text-secondary">Kabupaten Sarolangun</span>
        </div>
        <div
          className={`relative z-50 flex h-6 w-[25px] flex-col justify-between ${open ? 'items-center' : 'items-end'}`}
          onClick={() => {
            setOpen(!open)
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-[6px] w-[25px] rounded-lg bg-secondary duration-300 transition-all ease-in-out ${
              open ? 'translate-y-[9px] rotate-45 ' : ''
            }`}
          />
          <span
            className={`h-[6px] rounded-lg bg-secondary duration-300 transition-all ease-in-out ${
              open ? 'w-0' : 'w-[18px] '
            }`}
          />
          <span
            className={`h-[6px] rounded-lg bg-secondary duration-300 transition-all ease-in-out ${
              open ? '-translate-y-[9px] -rotate-45 w-full' : 'w-[12px]'
            }`}
          />
        </div>
      </div>
    </nav>
  )
}
