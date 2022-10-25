import Image from 'next/image';
import React, { useState } from 'react';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

const Profil = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar />
        </div>
        <section className='mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]'>
          <Image
            src='/images/profil-golkar.png'
            alt='logo-golkar'
            className='mb-4 h-[380px] w-[380px] basis-4/12'
            height={1200}
            width={1149}
            layout='responsive'
            objectFit='contain'
          />
          <div className='basis-8/12 p-2'>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Golongan Karya (Golkar) muncul dari kolaborasi gagasan tiga
                tokoh, Soekarno, Soepomo, dan Ki Hadjar Dewantara. Ketiganya,
                mengajukan gagasan integralistik-kolektivitis sejak 1940. Saat
                itu, gagasan tiga tokoh ini mewujud dengan adanya Golongan
                Fungsional. Dari nama ini, kemudian diubah dalam bahasa
                Sansekerta sehingga menjadi Golongan Karya pada 1959. Hingga
                kini, Golongan Karya dikenal dalam dunia politik nasional
                sebagai Golkar.
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Pada dekade 1950-an, pembentukan Golongan Karya semula
                diorientasikan sebagai perwakilan dari golongan-golongan di
                tegah masyarakat. Perwakilan ini diharapkan bisa
                merepresentasikan keterwakilan kolektif sebagai bentuk
                ‘demokrasi’ yang khas Indonesia. Wujud ‘demokrasi’ inilah yang
                kerap disuarakan Bung Karno, Prof Soepomo, maupun Ki Hadjar
                Dewantara.
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Pada awal berdiri, Golkar bukan mewujud sebuah partai, melainkan
                perwakilan golongan melalui Golongan Karya. Ide awal Golkar
                yaitu sebagai sistem perwakilan (alternatif) dan dasar
                perwakilan lembaga-lembaga representatif. Tahun 1957 adalah masa
                awal berdirinya organisasi Golkar. Pada waktu itu sistem
                multipartai mulai berkembang di Indonesia. Golkar sebagai sebuah
                alternatif merupakan organisasi yang terdiri dari
                golongan-golongan fungsional.
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Golkar juga memiliki tujuan untuk membangun organisasi
                masyarakat atau ormas. Golkar beralih menjadi sebuah partai
                politik ketika Bung Karno yang bertindak sebagai konseptor dan
                Jenderal TNI (Purn) Abdul Haris Nasution yang berfungsi sebagai
                penggerak, bersama dengan Angkatan Darat, mengubah Golkar
                sebagai sebuah partai politik untuk melawan PKI.
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Hal ini bertentangan dengan konsep awal Golkar yang menolak
                konsep partai dan PKI yang menuntut perbedaan kelas. Golkar
                memiliki konsep untuk menumbuhkan persatuan dan kerjasama.
                Akhirnya, Golkar yang anti partai runtuh menjadi sebuah partai.
                Ide Golkar yang awalnya menghancurkan partai-partai yang ada,
                justru menjadi sebuah partai yang eksis hingga saat ini.
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Partai Golongan Karya sebelumnya bernama Golongan Karya dan
                Sekretariat Bersama Golongan Karya (Sekber Golkar), adalah
                sebuah partai politik di Indonesia. Partai Golkar bermula dengan
                berdirinya Sekber Golkar di masa-masa akhir pemerintahan
                Presiden Soekarno. Tepatnya tahun 1964 oleh Angkatan Darat
                digunakan untuk menandingi pengaruh Partai Komunis Indonesia
                dalam kehidupan politik.\
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Golkar merupakan partai yang telah dirintis sejak zaman Orde
                Lama. Kehadirannya di masa Orde Baru dalam rangka pembaruan
                politik di Indonesia. Pada Pemilu 3 Juli 1971, Sekber Golkar
                memperoleh 62,8 % suara sehingga mendapatkan 236 dari 360 kursi
                anggota dalam DPR. Jumlah kursi ini masih ditambah dengan 100
                kursi yang akan diisi anggota yang diangkat pemerintah. Jumlah
                suara terbesar partai 18,7 % diperoleh NU, sedang PNI hanya
                mendapatkan 6,9 % dan Permusi, penerus Masyumi hanya 5,4%.
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Partai Golongan Karya (Partai Golkar), sebelumnya bernama
                Golongan Karya (Golkar) dan Sekretariat Bersama Golongan Karya
                (Sekber Golkar), merupakan partai politik di Indonesia. Partai
                Golkar didirikan pada tanggal 20 Oktober 1964 oleh Soeharto dan
                Suhardiman.
              </div>
            </div>
            <div className='my-4 font-bold'>
              Berikut Ketua dari Partai Golkar dari tahun ke tahun hingga
              sekarang
            </div>
            <div className='font-bold text-slate-500'>
              <div className='flex w-full flex-row items-center border-2 border-slate-300 p-2 text-lg'>
                <div
                  className='relative z-50 flex h-5 w-5 flex-col items-center justify-between'
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <span className='h-1 w-full translate-y-2 transform bg-slate-500 transition duration-300 ease-in-out' />
                  <span
                    className={`h-1 w-full -translate-y-2 -rotate-90 transform bg-slate-500 transition-all duration-300 ease-in-out ${
                      open ? 'w-0 bg-slate-500 ' : 'w-full'
                    }`}
                  />
                </div>
                <div className='ml-3'>1964 - 1969</div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
};

export default Profil;
