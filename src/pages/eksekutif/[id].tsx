import React from 'react';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

const Eksekutif = () => {
  return (
    <Layout>
      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar />
        </div>
        <section className='mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]'></section>
        <Footer />
      </main>
    </Layout>
  );
};

export default Eksekutif;
