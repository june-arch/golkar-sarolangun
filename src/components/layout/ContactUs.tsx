import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { RiWhatsappFill } from 'react-icons/ri';


const ContactUs = () => {
  const Maps = dynamic(() => import('@/components/layout/Maps'));
  return (
    <section className='flex flex-col py-10 2xl:px-20'>
      <div className='md:text4xl text-center text-2xl sm:text-3xl lg:text-5xl'>
        <div className='mb-10'>Hubungi Kami</div>
      </div>
      <div id='map' className=''>
        <Maps />
      </div>
      <div className='mt-2 w-full p-4 lg:mt-10'>
        <Link href='https://wa.me/6281379693637?text=Hello+Saya+ingin+bertanya+%3F'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='focus:shadow-outline flex w-[20vh] cursor-pointer flex-row rounded-full bg-white text-slate-700 shadow-md transition-colors duration-150 hover:bg-slate-200 hover:text-black md:w-[30vh] lg:w-[47vh]'
          >
            <RiWhatsappFill className='h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24' />
            <div className='sm:text-md ml-4 self-center text-sm md:text-2xl lg:text-4xl'>
              081379693637
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default ContactUs;
