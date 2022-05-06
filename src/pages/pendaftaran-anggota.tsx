import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { contentOne } from '@/lib/data';
import { NavItem } from '@/lib/types';

import Button from '@/components/buttons/Button';
import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

type Props = {
  navItem: NavItem;
};

const PendaftaranAnggota = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <div className='sticky top-0 z-50 bg-yellow-300'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className='mx-auto flex flex-col p-2 lg:w-[90vh] xl:w-[110vh]'>
          <NextImage
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
              <Button className='w-full justify-center text-xl'>
                Download Formulir
              </Button>
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
