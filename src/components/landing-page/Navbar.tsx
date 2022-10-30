import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { StateHomePage } from '@/helpers/hooks/use-context';
import { Menus } from '@/helpers/interface/types';
import { paddingDefault } from '@/pages';

import MobileNavbar from './MobileNavbar';

type Data = {
  'nav-items': Menus[];
};

export default function Navbar() {
  const { navigation } = useContext(StateHomePage);
  const { open, setOpen, data } = navigation;
  return (
    <nav className={`flex flex-row items-center ${paddingDefault} px-8 py-2`}>
      <MobileNavbar />
      <div className='flex basis-1/12 cursor-pointer items-center'>
        <Link href='/'>
          <div className='h-[51px] w-[48px]'>
              <Image
                src='/images/logo.png'
                alt='logo-golkar'
                height={1200}
                width={1149}
              />
            </div>
        </Link>
      </div>
      <ol className='text-md hidden flex-row justify-evenly self-center font-sans uppercase text-slate-700 md:flex md:basis-11/12 xl:basis-11/12'>
        {data.map((value, i) => {
          return (
            <li
              className='group-one last-child-custom relative cursor-pointer'
              key={i}
            >
              <div className='transform whitespace-nowrap transition-transform duration-300 md:text-xs lg:text-sm'>
                <Link href={'/' + value.slug} className={`${
                      value.slug == '#disable' && 'pointer-events-none'
                    }`}>
                  <span>{value.name}</span>
                </Link>
                <svg
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  className={`${
                    value.subMenu.length > 0 ? '' : 'hidden'
                  } mt-1 ml-1 inline h-4 w-4 transform transition-transform duration-200 group-one-hover:rotate-180 md:-mt-1`}
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <ol className='absolute hidden whitespace-nowrap group-one-hover:block'>
                <div className='child-custom'>
                  <svg width='12' height='12' viewBox='0 0 50 43.3'>
                    <polygon points='0,43.3 25,0 50,43.3' fill='white' />
                  </svg>
                </div>
                <div className='child-custom-second -mt-1 rounded-sm bg-white p-4'>
                  {value.subMenu?.map((item, j) => {
                    return (
                      <li
                        className='group-two last-subChild-custom relative border-b-[1px] border-slate-400 py-2 text-xs last:border-b-0'
                        key={j}
                      >
                        <div className='flex flex-row '>
                          <Link href={'/' + item.slug} className={`${
                                value.slug == '#disable' &&
                                'pointer-events-none'
                              } basis-11/12`}>
                            <span>{item.name}</span>
                          </Link>
                          <svg
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            className={`${
                              item.subMenu.length > 0 ? '' : 'hidden'
                            } inline  h-4 w-4 basis-1/12 -rotate-90 self-center`}
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </div>
                        <ol className='absolute left-full top-0 hidden whitespace-nowrap pl-4 group-two-hover:block'>
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
                                  className='border-b-[1px] border-slate-400 py-2 last:border-b-0'
                                  key={k}
                                >
                                  <Link href={'/' + isi.slug} className={`${
                                        isi.slug == '#disable' &&
                                        'pointer-events-none'
                                      }`}>
                                    {isi.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </div>
                        </ol>
                      </li>
                    );
                  })}
                </div>
              </ol>
            </li>
          );
        })}
      </ol>
      <div className='flex basis-11/12 items-center justify-between md:hidden'>
        <div className='flex flex-col px-4 uppercase tracking-tighter'>
          <span className='text-header font-[900] text-black'>
            Partai Golkar
          </span>
          <span className='text-header-sub font-[900] text-secondary'>
            Kabupaten Sarolangun
          </span>
        </div>
        <div
          className={`relative z-50 flex h-6 w-[25px] flex-col justify-between ${
            open ? 'items-center' : 'items-end'
          }`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-[6px] w-[25px] rounded-lg bg-secondary transition-all duration-300 ease-in-out ${
              open ? 'translate-y-[9px] rotate-45 ' : ''
            }`}
          />
          <span
            className={`h-[6px] rounded-lg bg-secondary transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-[18px] '
            }`}
          />
          <span
            className={`h-[6px] rounded-lg bg-secondary transition-all duration-300 ease-in-out ${
              open ? 'w-full -translate-y-[9px] -rotate-45' : 'w-[12px]'
            }`}
          />
        </div>
      </div>
    </nav>
  );
}
