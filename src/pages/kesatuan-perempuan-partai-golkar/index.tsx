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

const KesatuanPerempuanPartai = ({ navItem }: Props) => {
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
                  src='/images/kesatuan-perempuan-partai-golkar.png'
                  alt='kesatuan perempuan partai golkar'
                  height={1200}
                  width={1149}
                  objectFit='contain'
                />
              </div>
            </div>
            <div className='flow-root text-justify'>
              <div className='my-2'>
                Partai GOLKAR, yang merupakan partai besar di Indonesia
                senantiasa melakukan penguatan kader dari berbagai lini. Tak
                terkecuali untuk basis kader pemuda dan perempuan. Karenanya,
                pada tahun 2002, melalui RAPIMNAS ke-V Partai GOLKAR, lahir
                gagasan untuk membentuk organisasi sayap pemuda dan perempuan,
                guna mendukung kerja-kerja politik di lapangan.
              </div>
              <div className='my-2'>
                Langkah ini juga sebagai upaya konsolidasi dan optimalisasi
                potensi dan kekuatan kader sayap partai, untuk perluasan dan
                perekrutan basis massa. Mengingat kondisi eksternal yang berlaku
                pada saat itu, yakni Undang-undang Ormas nomor 8 tahun 1985
                menegaskan bahwa ormas tidak bisa bernaung di bawah partai
                politik dan tidak diperbolehkan memberi dukungan kepada partai
                politik, maka sangat dibutuhkan organisasi sayap (internal)
                Partai GOLKAR.
              </div>
              <div className='my-2'>
                Surat Keputusan Nomor : I/RAPIM-V/GOLKAR/2002 Tanggal 8 Februari
                2002, menjadi penegasan resmi tentang kebijakan pembentukan
                organisasi sayap Partai GOLKAR, di bidang pemuda dan perempuan.
                Dengan keputusan ini, kedudukan organisasi sayap pemuda dan
                perempuan menjadi bagian struktur internal partai, yang bersifat
                instruktif, dan bertanggung jawab kepada Dewan Pimpinan Partai
                Golkar.
              </div>
              <div className='my-2'>
                Menindaklanjuti surat keputusan tersebut, proses dan tahapan
                pembentukan pun dijalankan, 26 Maret 2002, diinisiasi Ketua
                Korbid Perempuan DPP Partai Golkar kala itu, dilakukan pertemuan
                para tokoh perempuan yang kemudian menghasilkan kesepakatan
                untuk membentuk wadah perempuan Partai Golkar. 22-23 Mei 2002,
                digelar Rapat Kerja Nasional Bidang Perempuan, dengan peserta
                seluruh Ketua Bidang Perempuan Partai GOLKAR Provinsi dan
                Pimpinan Ormas Perempuan, yang menghasilkan 7 (Tujuh) Prinsip
                Pembentukan Organisasi
              </div>

              <div className='my-2'>
                Pertama: Organisasi Sayap Perempuan Partai GOLKAR dituntut untuk
                berperan aktif dalam menjawab permasalahan dan tantangan serta
                melaksanakan seluruh program Partai GOLKAR sebagai upaya untuk
                menyikapi kondisi yang ada serta mengembangkan perjuangan Partai
                GOLKAR sesuai dengan Paradigma Baru Partai GOLKAR ke depan.
              </div>
              <div className='my-2'>
                Kedua: Sebagai bagian dari Partai GOLKAR, Organisasi Sayap
                Perempuan Partai GOLKAR dituntut untuk memperkuat gerakannya
                dalam rangka penggalangan massa kelompok strategis perempuan
                sebagai kekuatan yang cukup besar dan potensial untuk memainkan
                peranannya dan melakukan kegiatan – kegiatan dalam membersarkan
                dan memajukan Partai GOLKAR
              </div>
              <div className='my-2'>
                Ketiga: Organisasi Sayap Perempuan Partai GOLKAR disebut nama
                “Kesatuan Perempuan Partai GOLKAR” dan berkedudukan pada seluruh
                jajaran Kepengurusan Partai GOLKAR di Tingkat Pusat sampai ke
                Tingkat Kelurahan / Desa. Sesuai kebijakan DPP Partai GOLKAR,
                untuk pertama kalinya Ketua Umum Perempuan Partai GOLKAR dijabat
                oleh Ketua Korbid Sosial dan Pemberdayaan Perempuan DPP Partai
                GOLKAR.
              </div>
              <div className='my-2'>
                Keempat: Segera setelah pendeklarasian Perempuan Partai GOLKAR
                harus ada komitmen dan penegasan Partai GOLKAR bahwa Organisasi
                Sayap Perempuan Partai GOLKAR merupakan sumber rekruitmen kader
                perempuan Partai GOLKAR ke depan.
              </div>
              <div className='my-2'>
                Kelima: Pembentukan Organisasi Sayap Perempuan Partai GOLKAR,
                merupakan momentum penting untuk melaksanakan perubahan secara
                menyeluruh terhadap struktur Partai GOLKAR dalam rangka
                menyikapi dan mengikuti tuntutan perjuangan Partai GOLKAR.
                Partai GOLKAR dituntut untuk secara sungguh – sungguh memberikan
                perhatian dan kesempatan bagi anggota / kader perempuan Partai
                GOLKAR, sesuai semangat reformasi yang menekankan pada unsur –
                unsur persamaan dan keadilan.
              </div>
              <div className='my-2'>
                Keenam: Pembentukan Organisasi Sayap Perempuan Partai GOLKAR
                merupakan komitmen dan penegasan Partai GOLKAR untuk
                meningkatkan kedudukan dan partisipasi kader perempuan Partai
                GOLKAR pada posisi – posisi strategis di partai maupun pada
                lembaga – lembaga politik lainnya.
              </div>
              <div className='my-2'>
                Ketujuh: Dalam waktu selambat–lambatnya 8 (delapan) bulan ke
                depan mempersiapkan Organisasi Sayap Perempuan Partai GOLKAR di
                daerah. Dalam rangka koordinasi dan konsolidasi kepengurusan
                serta program kerja, maka selambat – lambatnya 1 (satu) tahun
                setelah pendeklarasian Organisasi sayap Perempuan Partai GOLKAR,
                diadakan Rapat Kerja Nasional (Rakernas) I Organisasi sayap
                Perempuan Partai GOLKAR.
              </div>
              <div className='my-2'>
                23 Mei 2002, Melalui Keputusan DPP Partai GOLKAR Nomor :
                KEP-264/DPP/GOLKAR/V/2002 Kesatuan Perempuan Partai GOLKAR,
                KPPG, di deklarasikan, dengan dihadiri oleh 165 orang peserta
                dari organisasi perempuan tingkat nasional. Dan melalui Surat
                Keputusan Nomor : Kep-265/DPP/GOLKAR/V/2002 Tanggal: 23 Mei 2002
                Tentang Komposisi dan Personalia Pimpinan Pusat Kesatuan
                Perempuan Partai GOLKAR ditetapkan kepengurusan pertama PP KPPG.
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

export default KesatuanPerempuanPartai;
