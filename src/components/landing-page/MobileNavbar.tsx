import React, { Dispatch, SetStateAction, useEffect } from 'react'

import { Menus } from '@/helpers/interface/types'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  open: boolean
  navItems: Data
  openSub1: OpenSub
  openSub2: OpenSub2
  setOpenSub1: Dispatch<SetStateAction<OpenSub>>
  setOpenSub2: Dispatch<SetStateAction<OpenSub2>>
}

type Data = {
  'nav-items': Menus[]
}

type OpenSub = {
  state: boolean
  posisi: number
}
type OpenSub2 = {
  state: boolean
  posisiParent: number
  posisi: number
}

const MobileNavbar = (props: Props) => {
  const { open, navItems, openSub1, openSub2, setOpenSub1, setOpenSub2 } = props
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  useEffect(() => {
    // only execute all the code below in client side
    const handleResize = () => {
      // Set window width/height to state
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  useEffect(() => {
    //manipulate element every update openSub1
    const elementButtonMenu1 = document.getElementById(
      'buttonMenu1-' + openSub1.posisi
    )
    const elementButtonTrans = document.getElementById(
      'subMenu1-' + openSub1.posisi
    )
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
    const elementButtonMenu1 = document.getElementById(
      'buttonMenu2-' + openSub2.posisiParent + '-' + openSub2.posisi
    )
    const elementButtonTrans2 = document.getElementById(
      'subMenu2-' + openSub2.posisiParent + '-' + openSub2.posisi
    )
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
    <div
      className={`absolute top-0 left-0 z-50 h-screen  w-full transform bg-white ${
        open ? '-translate-x-0' : '-translate-x-full'
      } drop-shadow-md filter transition-transform duration-300 ease-in-out `}
    >
      <div className="flex h-20 items-center justify-center bg-white drop-shadow-md filter">
        <div className="cursor-pointer text-xl font-semibold">
          <Link href="/">
            <a>
              <Image
                src="/images/logo.png"
                alt="logo-golkar"
                className="mr-5 h-14 w-14"
                height={1200}
                width={1149}
                layout="responsive"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="mx-6 flex h-full flex-col overflow-auto py-4 pb-24 scrollbar-hide">
        {navItems['nav-items'].map((value, i) => {
          return (
            <div key={i} className="py-2 text-sm font-medium">
              <div className="flex">
                <button className="grow-0 uppercase">{value.name}</button>
                <div
                  className="grow"
                  onClick={() =>
                    setOpenSub1({ state: !openSub1.state, posisi: i })
                  }
                >
                  <div className="flex justify-end pr-4">
                    <svg
                      id={`buttonMenu1-${i}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className={`${
                        value.subMenu.length > 0 ? '' : 'hidden'
                      } mt-1 ml-1 inline h-4 w-4`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <hr className="border-1 mt-2 mr-4 border-slate-200" />
              <div className="overflow-auto scrollbar-hide">
                <div
                  id={`subMenu1-${i}`}
                  className={` delay-0 -translate-y-96 transform transition-all duration-300 ease-in-out`}
                >
                  {value?.subMenu.map((item, j) => {
                    return (
                      <div key={j} className="hidden py-2 pl-2">
                        <div className="flex">
                          <button className="grow-0 text-left uppercase">
                            {item.name}
                          </button>
                          <div
                            className="grow"
                            onClick={() =>
                              setOpenSub2({
                                state: !openSub2.state,
                                posisiParent: i,
                                posisi: j,
                              })
                            }
                          >
                            <div className="flex justify-end">
                              <svg
                                id={`buttonMenu2-${i}-${j}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className={`${
                                  item.subMenu.length > 0 ? '' : 'hidden'
                                } mt-1 ml-1 inline h-4 w-4`}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <hr className="border-1 mt-2 border-slate-200" />
                        <div className="overflow-auto scrollbar-hide">
                          <div
                            id={`subMenu2-${i}-${j}`}
                            className=" delay-0 -translate-y-96 transform transition-all duration-300 ease-in-out"
                          >
                            {item?.subMenu.map((isi, k) => {
                              return (
                                <div key={k} className="hidden py-2 pl-4">
                                  <div className="flex">
                                    <button className="grow-0 text-left uppercase">
                                      {isi.name}
                                    </button>
                                    <div
                                      className="grow"
                                      onClick={() =>
                                        setOpenSub2({
                                          state: !openSub2.state,
                                          posisiParent: i,
                                          posisi: j,
                                        })
                                      }
                                    ></div>
                                  </div>
                                  <hr className="border-1 mt-2 border-slate-200" />
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
