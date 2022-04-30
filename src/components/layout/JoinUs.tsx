import Link from 'next/link';
import React from 'react';

import NextImage from '../NextImage';

type Props = {
  description: string;
  'image-kita-satu': string;
};

const JoinUs = (navItem: Props) => {
  return (
    <section className='flex flex-col px-10'>
      <div className='flex flex-row justify-around'>
        <div className='basis-1/2 font-sans'>
          <div className='text-center text-2xl sm:text-3xl lg:text-5xl xl:text-9xl'>
            <h1>Golkar Sarolangun</h1>
          </div>
          <div className='sm:text-md cursor-pointer text-center text-xs sm:mt-6 sm:font-bold 2xl:text-2xl'>
            <Link href='#'>
              <a className=''>
                <button className='focus:shadow-outline h-14 w-96 rounded-lg bg-white  px-3 text-slate-700 shadow-md transition-colors duration-150 hover:bg-slate-200 hover:text-black sm:w-56 lg:w-96'>
                  Bergabung Menjadi Anggota
                </button>
              </a>
            </Link>
          </div>
        </div>
        <div className='basis-1/2'></div>
      </div>
      <div className='mt-8 flex flex-col self-center sm:mt-64 md:mt-80 xl:mt-96 2xl:mt-48'>
        <div className='flex w-72 self-center'>
          <div className='w-full bg-local'>
            <NextImage
              src={navItem['image-kita-satu']}
              alt='kita-satu'
              height='25'
              width='100%'
              layout='responsive'
              objectFit='contain'
              className='-z-10'
            />
          </div>
        </div>
        <p className='mt-5 w-[35vh] text-center text-xs sm:w-[50vh] sm:text-sm xs:w-[40vh]'>
          {navItem.description}
        </p>
      </div>
    </section>
  );
};

export default JoinUs;
