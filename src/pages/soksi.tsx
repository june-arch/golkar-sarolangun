import { GetStaticProps } from 'next';
import React from 'react';

import { contentOne } from '@/lib/data';
import { NavItem } from '@/interface/types';

import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';


type Props = {
  navItem: NavItem;
};

const Soksi = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      
      <main>
        <div className='sticky top-0 z-50 bg-yellow-300'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className='mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]'></section>
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

export default Soksi;
