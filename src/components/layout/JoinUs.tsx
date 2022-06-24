
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


type Props = {
  description: string;
  'image-kita-satu': string;
};

const JoinUs = (navItem: Props) => {
  return (
    <section className='flex flex-col px-10'>
      <div className='mt-28 flex flex-row justify-around sm:mt-0'>
        <div className='basis-1/2 font-sans lg:pl-4'>
          <div className='hidden text-left text-2xl font-bold sm:block sm:text-5xl md:text-7xl lg:text-center lg:text-8xl xl:text-9xl'>
            Golkar Sarolangun
          </div>
          <div className='text-md cursor-pointer text-left font-bold sm:mt-6 md:text-lg lg:text-center lg:text-xl xl:text-2xl 2xl:text-3xl'>
            <Link href='/pendaftaran-anggota'>
              <a className=''>
                <button className='bg-yellow-300 text-black'>
                  Bergabung Menjadi Anggota
                </button>
              </a>
            </Link>
          </div>
        </div>
        <div className='basis-1/2'></div>
      </div>
      <div className='mt-12 flex flex-col self-center sm:mt-40 md:mt-52 lg:mt-60 xl:mt-80 2xl:mt-36'>
        <div className='flex w-72 self-center'>
          <div className='w-full bg-local'>
            <Image
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
