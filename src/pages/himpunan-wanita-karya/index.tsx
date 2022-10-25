import Image from 'next/image';
import React from 'react';

import styles from '@/styles/img.module.css';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

const HimpunanWanitaKarya = () => {
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
                  src='/images/himpunan-wanita-karya.png'
                  alt='himpunan wanita karya'
                  height={1200}
                  width={1149}
                  objectFit='contain'
                />
              </div>
            </div>

            <div className='flow-root text-justify'>
              <div className='my-2'>
                <strong>SEJARAH DAN PERKEMBANGAN ORGANISASI</strong>
              </div>
              <div className='my-2'>
                Himpunan Wanita Karya (HWK) didirikan pada tanggal 28 Februari
                1981 sebagai perwujudan kebulatan tekad para kader Golkar
                Wanita. Tujuan utamanya sebagai tempat penggodokan untuk
                peningkatan kualitas kader wanita, sebagai kader pembangunan
                maupun kader organisasi. Sebagai wadah untuk menerpa kebersamaan
                arah dan langkah wanita yang berorientasi pada karya dan
                kekaryaan. Pada Munas HWK ke III November 1991 telah
                menghasilkan beberapa ketetapan antara lain mengenai anggaran
                Dasar dan Anggaran Rumah Tangga serta Program Umum Himpunan
                Wanita Karya 1991-1996.
              </div>
              <div className='my-2'>
                Untuk dapat ikut serta dalam pembangunan secara lebih berarti,
                organisasi kewanitaan ini memfokuskan program-program kegiatan
                dengan tolak ukur secara sosial lebih meningkatkan pemerataan,
                secara ekonomi lebih meningkatkan pendapatan masyarakat. HWK
                juga telah mengembangkan berbagai kegiatan yang bertujuan untuk
                membangkitkan prakarsa masyarakat ditingkat pedesaan melalui
                rembuk keluarga, pembentukan satuan kerja, pembentukan karang
                lansia untuk para lanjut usia dan karang balita.
              </div>
              <div className='my-5'>
                <strong>VISI DAN MISI ORGANISASI</strong>
              </div>
              <div className='my-2'>
                <div className='my-1'>
                  <strong> Visi </strong>
                </div>
                <p>
                  a. Menyatukan wawasan, sikap, gerak langkah an peran serta
                  wanita dalam pembangunan nasional.
                </p>
                <p>
                  b. Mengembangkan pemikiran dan konsep nasional dalam rangka
                  peningkatan kualitas dan peran wanita sesuai dengan
                  perkembangan zaman.
                </p>
                <p>
                  c. Menampung, memadukan, menyalurkan serta memperjuangkan
                  aspirasi wanita dan masyarakat.
                </p>
                <div className='my-1'>
                  <strong> Misi </strong>
                </div>
                <p>
                  a. Meningkatkan kualitas wanita Indonesia dalam perannya
                  sebagai pelaku pembangunan serta pengabdiannya terhadap
                  organisasi, bangsa dan negara, melalui upaya peningkatan
                  pengetahuan dan keterampilan, serta usaha pembinaan dan
                  pengembangan anggota.
                </p>
                <p>
                  b. Menanamkan pengertian dan kesadaran kepada masyarakat
                  tentang hak, kewajiban, kesempatan dan kedudukan yang sama
                  antara pria dan wanita sebagai mitra sejajar yang harmonis
                  didalam negara hukum yang sedang membangun.
                </p>
                <p>
                  c. Meningkatkan kualitas wanita Indonesia dan pendayagunaan
                  peran sertanya dalam pembangunan nasional melalui fungsi dan
                  profesi masing-masing.
                </p>
                <p>
                  d. Melaksanakan kaderisasi secara terus menerus untuk
                  kepentingan organisasi, pembangunan nasional dan bangsa.
                </p>
              </div>
              <div className='my-5'>
                Untuk dapat ikut serta dalam pembangunan secara lebih berarti,
                organisasi kewanitaan ini memfokuskan program-program kegiatan
                dengan tolak ukur secara sosial lebih meningkatkan pemerataan,
                secara ekonomi lebih meningkatkan pendapatan masyarakat. HWK
                juga telah mengembangkan berbagai kegiatan yang bertujuan untuk
                membangkitkan prakarsa masyarakat ditingkat pedesaan melalui
                rembuk keluarga, pembentukan satuan kerja, pembentukan karang
                lansia untuk para lanjut usia dan karang balita.
              </div>
              <div className='my-5'>
                <strong>STRUKTUR ORGANISASI DAN FOKUS KEGIATAN</strong>
              </div>
              <div className='my-2'>
                <div className='my-1'>
                  <strong> 1. Kepengurusan. </strong>
                </div>
                <p> a. Pengurus Pusat : Berkedudukan di Jakarta </p>
                <p>
                  {' '}
                  b. Pengurus Daerah : 27 di tk. I, 297 di tk. II c. Pengurus
                  Cabang : 3020 /Kec.{' '}
                </p>
                <div className='my-1'>
                  <strong> 2. Keanggotaan. </strong>
                </div>
                <p>
                  {' '}
                  Jumlah anggota diperkirakan : 25.000.000 anggota biasa, 10
                  anggota kehormatan.{' '}
                </p>

                <div className='my-1'>
                  <strong> 3. Kegiatan. </strong>
                </div>
                <p> a. Fungsional. </p>
                <p> b. Profesi. </p>
                <p> c. Sosial Kemasyarakatan. </p>
              </div>
              <div className='my-2'>
                <strong> IDENTITAS ORGANISASI </strong>
                <p> 1. Nama Organisasi : Himpunan Wanita Karya. </p>
                <p>
                  {' '}
                  2. Alamat kantor : Jl. Duren Tiga No. 38, Jakarta Selatan
                  12760 Telp : 021 – 7992485 Fax : 021 – 7992238{' '}
                </p>
                <p> 3. Tahun Berdiri : 1981 4. Tahun Masuk Kowani : 1983 </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
};

export default HimpunanWanitaKarya;
