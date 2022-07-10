import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { RiWhatsappFill } from 'react-icons/ri';


const ContactUs = () => {
  const Maps = dynamic(() => import('@/components/landing-page/Maps'));
  return (
    <section className='flex flex-col py-10 2xl:px-20'>
      <div className='md:text4xl text-center text-2xl sm:text-3xl lg:text-5xl'>
        <div className='mb-10'>Hubungi Kami</div>
      </div>
      <div id='map' className=''>
        <Maps />
      </div>
    </section>
  );
};

export default ContactUs;
