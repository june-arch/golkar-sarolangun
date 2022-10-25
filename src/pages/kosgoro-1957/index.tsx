import { GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';

import styles from '@/styles/img.module.css';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

import { NavItem } from '@/helpers/interface/types';
import { contentOne } from '@/components/resource/navigation';

type Props = {
  navItem: NavItem;
};

const Kosgoro1957 = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className='mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]'>
          <div className='bg-light items-center justify-center self-center'>
            <div className={styles.pictures}>
              <div className={styles.img}>
                <Image
                  src='/images/kosgoro.png'
                  alt='ormas kosgoro 1957'
                  height={392}
                  width={392}
                  objectFit='contain'
                />
              </div>
            </div>
            <div className='basis-8/12 p-2'>
              <div className='flow-root text-justify'>
                <div className='my-2'>
                  Kesatuan Organisasi Serbaguna Gotong Royong yang berdiri pada
                  tanggal 10 November 1957. Kosgoro merupakan salah satu KINO
                  (Kelompok Induk Organisasi), disamping SOKSI dan MKGR, yang
                  melahirkan Sekretariat Bersama Golongan Karya (Sekber Golkar)
                  pada 20 Oktober 1964. Kino-kino tersebut pada tahun 1970
                  mengeluarkan keputusan bersama untuk ikut menjadi peserta
                  pemilihan umum melalui satu nama dan tanda gambar yaitu
                  Golongan Karya (GOLKAR). Logo yang menjadi tanda gambar GOLKAR
                  sejak Pemilu tersebut tetap dipertahankan hingga sekarang.
                </div>
                <div>
                  KOSGORO didirikan oleh Mas Isman (Ayah dari Hayono Isman/ Ex
                  Menpora RI), Mas Isman adalah Ex Komandan pejuang Tentara
                  Pelajar Jawa Timur/ TRIP, KOSGORO memiliki semboyan Tri Dharma
                  yaitu: Pengabdian, Kerakyatan dan Solidaritas. KOSGORO sebagai
                  Induk Organisasi memiliki gerakan, badan, dan lembaga yang
                  merupakan alat kelengkapan organisasi, yang terdiri dari:
                  Gerakan Mahasiswa Kosgoro (Gema Kosgoro), Generasi Muda
                  Kosgoro (GM Kosgoro), Badan Musyawarah Pengusaha Swasta
                  (Bamuhas), Wanita Kosgoro, dan Lembaga Bantuan Penyuluhan
                  Hukum Kosgoro (LBPH Kosgoro).
                </div>
              </div>
            </div>
          </div>
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

export default Kosgoro1957;
