import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useContext } from 'react';

import { navData } from '@/components/resource/side-navigation';

import { OpenContext } from '@/helpers/hooks/use-context';

export const Sidenav = () => {
  const {open, setOpen} = useContext(OpenContext);
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={`fixed inset-y-0 inset-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }  bg-[#3a3a3a70] transition-all duration-75`}
      />
      <div
        className={`fixed z-50 h-full  w-80 bg-gray-600 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transform overflow-y-auto transition-all duration-300`}
      >
        <div className='flex items-center justify-center space-x-3 p-10'>
          <button
            className='absolute right-4'
            onClick={() => setOpen(!open)}
          >
            <XIcon className='h-8 w-8 text-gray-50' />
          </button>
          <Link href='/admin'>
            <span className='text-2xl text-yellow-500'>
              GOLKAR SAROLANGUN
            </span>
          </Link>
        </div>
        {navData.menuItems.map((value, index) => (
          <div key={index} className='mb-2 flex flex-col space-y-2'>
            {value.items.map(({ seconTitle, title, icon, link }, index) => (
              <div key={index} className='flex flex-col text-gray-50'>
                {seconTitle && (
                  <span className='pl-5 text-gray-400'>{seconTitle}</span>
                )}
                {title && (
                  <Link href={link} className='flex items-center space-x-4 p-4 text-gray-50 hover:bg-gray-500' onClick={() => setOpen(!open)}>
                    <span>{icon}</span>
                    <span className='text-lg capitalize '>{title}</span>
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
