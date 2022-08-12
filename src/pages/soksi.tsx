import { GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';

import styles from '@/styles/img.module.css';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

import { NavItem } from '@/helpers/interface/types';
import { contentOne } from '@/helpers/resource/nav-data';

type Props = {
  navItem: NavItem;
};

const Soksi = ({ navItem }: Props) => {
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
                  src='/images/soksi.jpg'
                  alt='ormas soksi'
                  height={273}
                  width={270}
                  objectFit='contain'
                />
              </div>
            </div>
            <div className='basis-8/12 p-2'>
              <div className='flow-root text-justify'>
                <div className='my-2'>
                  Sekitar tahun 1960-an, keberadaan Pancasila, Undang-undang
                  Dasar 1945, dan keutuhan Negara Kesatuan Republik Indonesia
                  (NKRI) mengalami berbagai cobaan terutama dari Partai Komunis
                  Indonesia (PKI) dengan ondderbouw-nya. Sayap organisasi
                  dibawah PKI itu seperti SOBSI, Pemuda Rakyat, Gerwani, Lekra,
                  dan Corps Gerakan Mahasiswa Indonesia (CGMI).
                </div>
                <div className='my-2'>
                  Atas kondisi itu, SOKSI lahir tepatnya pada 20 Mei 1960
                  sebagai panggilan sejarah untuk membela Pancasila, UUD 1945,
                  dan keutuhan NKRI. Saat didirikan nama SOKSI memiliki
                  kepanjangan dari Sentral Organisasi Karyawan Sosialis
                  Indonesia.
                </div>
                <div className='my-2'>
                  Pawa awalnya nama dan embrio SOKSI adalah Badan Pusat
                  Koordinasi Perusahaan-perusahaan Negara (BPKPN). Saat itu
                  pendiri SOKSI, Suhardiman menjabat sebagai Sekertaras BANAS
                  (Badan Nasionalisasi Perusahaan-Perusahaan Belanda) dan
                  ditugaskan oleh negara untuk menasionalisasi
                  perusahaan-perusahaan asing.
                </div>
                <div className='my-2'>
                  Nama SOKSI kemudian muncul pada pertemuan BPKPN di Palembang
                  yang akhirnya moment tersebut menjadi tanggal kelahiran SOKSI.
                  Waktu itu, Suhardiman menugaskan Adolf Rahman dan Suwignyo
                  untuk mencari nama yang tepat untuk pergerakan mereka. Tetapi,
                  keduanya belum juga menemukan nama yang tepat sampai larut
                  malam, hingga Suhardiman akhirnya menyampaikan nama SOKSI
                  sebagai singkatan Sentral Organisasi Karyawan Sosialis
                  Indonesia.
                </div>
                <div className='my-2'>
                  Di samping tekad menjadi pelopor lahirnya masyarkaat sosialis
                  Pancasila, Suhardiman memilih nama SOKSI juga secara politis
                  untuk menunjukan sikap perlawanan yang tegas terhadap PKI.
                  Khususnya terhadap SOBSI (Sentral Organisasi Buruh Seluruh
                  Indonesia).
                </div>
                <div className='my-2'>
                  Sikap perlawanan SOKSI terhadap PKI dan ondderbouw-nya juga
                  dilakukan dengan membuat mirip nama-nama lembaga konsentrasi
                  SOKSI dengan organisasi sayap PKI.
                </div>
                <div className='my-2'>
                  Antara lain Gerwasi (Gerakan Wanitas Sosialis Indonesia) untuk
                  menghadapi Gerwani (Gerakan Wanita Indonesia), Lekri (Lembaga
                  Kebudayaan Republik Indonesia) untuk melawan Lekra (Lembaag
                  Kebudayaan Rakyat) milik PKI, RTI (Rukun Tani Indonesia) untuk
                  menghadapi BTI (Barisan Tani Indonesia) milik PKI.
                </div>
                <div className='my-2'>
                  Sikap dan pembelaan terhadap idiologi dan konstitusi negara
                  didasarkan kepada keyakinan SOKSI bahwa Pancasila dan UUD 1945
                  yang dihasilkan oleh para negarawan dan pendiri bangsa, adalah
                  alat dan sarana terbaik untuk mencapai cita-cita sebuah bangsa
                  yang majemuk, yakni menacapai masyarakat yang adil, makmur,
                  dan sejahtera.
                </div>
                <div className='my-2'>
                  Keyakinan dan kecintaan terhadap Pancasila dan UUD 1945 itu
                  yang mendasari sikap dan perlawanan SOKSI terhadap PKI. SOKSI
                  dengan lembaga konsentrasinya di berbagai lini melawan dengan
                  keras berbagai organisasi sayap PKI.
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

export default Soksi;
