import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import { contentOne } from '@/lib/data';
import { NavItem } from '@/controller/interface/types';

import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';

type Props = {
  navItem: NavItem;
};

const FraksiDpr = ({ navItem }: Props) => {
  return (
    <Layout>
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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export default FraksiDpr;
