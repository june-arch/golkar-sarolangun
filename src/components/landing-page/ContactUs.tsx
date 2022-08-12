import dynamic from 'next/dynamic';
import React from 'react';

const ContactUs = () => {
  const Maps = dynamic(() => import('@/components/landing-page/Maps'));
  return (
    <section className='flex w-full flex-col space-y-8 bg-[#F9F9F9] p-8'>
      <h1 className='text-center font-[600] uppercase text-secondary'>
        <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-4'>
          Hubungi
        </p>{' '}
        Kami
      </h1>
      <div id='map' className=''>
        <Maps />
      </div>
    </section>
  );
};

export default ContactUs;
