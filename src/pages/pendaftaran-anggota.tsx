import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { contentOne } from '@/lib/data';
import { NavItem } from '@/interface/types';

import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';


type Props = {
  navItem: NavItem;
};

const PendaftaranAnggota = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      
      <main>
        <div className='sticky top-0 z-50 bg-yellow-300'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className='mx-auto flex flex-col p-2 lg:w-[90vh] xl:w-[110vh]'>
          <Image
            src='/images/Cara-Mendaftar-Anggota-1024x1024.png'
            alt='register'
            className='mb-2 h-full w-full'
            height={1024}
            width={1024}
            layout='responsive'
            objectFit='cover'
          />
          <Link href='#'>
            <a>
              <button className='w-full justify-center text-xl'>
                Download Formulir
              </button>
            </a>
          </Link>
        </section>
        <Footer />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const navItem = contentOne;
  return {
    props: {
      navItem,
    },
  };
};

export default PendaftaranAnggota;
