import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { padding, paddingDefault } from '@/pages';

const ContactUs = () => {
  const Maps = dynamic(() => import('@/components/landing-page/Maps'));
  return (
    <div className='sm:bg-[#F9F9F9]'>
      <div className={`sm:flex sm:flex-col sm:p-4 ${paddingDefault} ${padding}`}>
        <h1 className='text-center font-[600] uppercase text-secondary hidden sm:block sm:p-1'>
          <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-4'>
            Hubungi
          </p>{' '}
          Kami
        </h1>
        <div className='flex flex-col sm:flex-row sm:items-center '>
          <section className='flex w-full flex-col space-y-8 bg-[#F9F9F9] p-8 sm:p-0 sm:basis-1/2'>
            <h1 className='text-center font-[600] uppercase text-secondary sm:hidden'>
              <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-4'>
                Hubungi
              </p>{' '}
              Kami
            </h1>
            <div id='map' className=''>
              <Maps />
            </div>
          </section>
          <section className='space-y-8 p-8 sm:p-0 sm:basis-1/2'>
            <h4 className='text-center uppercase sm:text-[24px]'>
              Ikuti Media Informasi Kami Lainnya
            </h4>
            <div className='flex flex-row justify-center space-x-6'>
              <Link href='https://www.facebook.com/mpogolkarsarolangun'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[34px] w-[34px]'
                >
                  <Image
                    src='/images/facebook.png'
                    alt='facebook-icon'
                    height='34'
                    width='34'
                  />
                </a>
              </Link>
              <Link href='https://www.instagram.com/golkar.sarolangun'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[34px] w-[34px]'
                >
                  <Image
                    src='/images/instagram.png'
                    alt='instagram-icon'
                    height='34'
                    width='34'
                  />
                </a>
              </Link>
              <Link href='https://twitter.com/@Mpo_Golkar_Srl'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[34px] w-[34px]'
                >
                  <Image
                    src='/images/twitter.png'
                    alt='twitter-icon'
                    height='34'
                    width='34'
                  />
                </a>
              </Link>
              <Link href='https://www.youtube.com/channel/UC7MXv1rQHAeHjkSQ70Pi2aQ'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[34px] w-[34px]'
                >
                  <Image
                    src='/images/youtube.png'
                    alt='youtube-icon'
                    height='34'
                    width='34'
                  />
                </a>
              </Link>
              <Link href='https://www.tiktok.com/@golkarsarolangun'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[34px] w-[34px]'
                >
                  <Image
                    src='/images/tik-tok.png'
                    alt='tiktok-icon'
                    height='34'
                    width='34'
                  />
                </a>
              </Link>
            </div>
            <div className='flex flex-row items-center justify-center space-x-6'>
              <Link href='https://www.golkarindonesia.com'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[46px] w-[132px]'
                >
                  <Image
                    src='/images/golkar-indonesia.png'
                    alt='tiktok-icon'
                    height='46'
                    width='132'
                  />
                </a>
              </Link>
              <Link href='https://kabargolkar.com'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-[24px] w-[167px]'
                >
                  <Image
                    src='/images/kabar-golkar.png'
                    alt='tiktok-icon'
                    height='24'
                    width='167'
                  />
                </a>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
