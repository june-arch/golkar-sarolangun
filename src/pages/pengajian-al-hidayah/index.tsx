import Image from 'next/image';
import React from 'react';

import styles from '@/styles/img.module.css';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

const PengajianAlHidayah = () => {
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
                  src='/images/pengajian-al-hidayah.png'
                  alt='pengajian al hidayah'
                  height={1200}
                  width={1149}
                />
              </div>
            </div>

            <div className='flow-root text-justify'>
              <div className='my-2'>
                <strong>SEJARAH DAN PERKEMBANGAN ORGANISASI</strong>
              </div>
              <div className='my-2'>
                Pengajian Al – Hidayah adalah organisasi sosial kemasyarakatan.
                Didirikan di Jakarta pada tanggal 5 Oktober 1979. Pengajian Al –
                Hidayah beraqidah Islam, berasaskan Pancasila dan UUD 45 beserta
                Amandemennya. Pengajian Al – Hidayah bersifat sosial, keagamaan,
                kesetaraan dan kesejahteraan.
              </div>
              <div className='my-2'>
                Pengajian Al – Hidayah beranggotakan kaum perempuan Indonesia
                yang beragama Islam. Kedaulatan organisasi berada ditangan
                anggota dan dilaksanakan sepenuhnya oleh Muktamar. Muktamar
                dilaksanakan sekali dalam 5 tahun.
              </div>

              <div className='my-5'>
                <strong>VISI DAN MISI ORGANISASI</strong>
              </div>
              <div className='my-2'>
                <div className='my-1'>
                  <strong> 1. Visi. </strong>
                </div>
                <p> a. Pengurus Pusat : Berkedudukan di Jakarta </p>
                <p>
                  {' '}
                  b. Pengurus Daerah : 27 di tk. I, 297 di tk. II c. Pengurus
                  Cabang : 3020 /Kec.{' '}
                </p>

                <div className='my-1'>
                  <strong> 2. Misi. </strong>
                </div>
                <p>
                  {' '}
                  1. Meningkatkan kualitas sumber daya perempuan Indonesia yang
                  meliputi aspek keagamaan, pendidikan, kebudayaan dan IPTEK.{' '}
                </p>
                <p>
                  {' '}
                  2. Menggalang dan menggerakan kaum perempuan Indonesia beserta
                  seluruh potensi yang dimilikinya.{' '}
                </p>
                <p>
                  {' '}
                  3. Mengupayakan system kehidupan kemasyarakatan, kebangsaan
                  dan kenegaraan yang menjamin hak – hak asasi perempuan dan
                  keluarga.{' '}
                </p>
                <p>
                  {' '}
                  4. Meningkatkan pemberdayaan kaum perempuan Indonesia di
                  berbagai bidang.{' '}
                </p>
                <p>
                  {' '}
                  5. Mewujudkan kesetaraan dan keadilan gender dalam berkeluarga
                  dan bermasyarakat.{' '}
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
};

export default PengajianAlHidayah;
