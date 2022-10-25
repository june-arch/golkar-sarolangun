import Image from 'next/image';
import React from 'react';

import styles from '@/styles/img.module.css';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

const Mkgr = () => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar />
        </div>
        <section className='mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]'>
          <div className='bg-light items-center justify-center self-center'>
            <div className={styles.pictures}>
              <div className={styles.img}>
                <Image
                  src='/images/mkgr.png'
                  alt='ormas mkgr'
                  height={1200}
                  width={1149}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
};

export default Mkgr;
