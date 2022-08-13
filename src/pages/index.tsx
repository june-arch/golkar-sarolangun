import {
  ChartSquareBarIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { RiFacebookCircleLine } from 'react-icons/ri';

import Carousel from '@/components/landing-page/Carousel';
import ContactUs from '@/components/landing-page/ContactUs';
import FloatingWhatsApp from '@/components/landing-page/FloatingWhatsapp';
import Footer from '@/components/landing-page/Footer';
import JoinUs from '@/components/landing-page/JoinUs';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import News from '@/components/landing-page/News';

import {
  CardIdiom,
  NavItem,
  NewsItem,
  VideoItem,
} from '@/helpers/interface/types';
import {
  contentBerita,
  contentOne,
  contentTwo,
  contentVideo,
} from '@/helpers/resource/nav-data';

// const axios = request.default;
type Props = {
  navItem: NavItem;
  videoItem: VideoItem[];
  newsItem: NewsItem[];
  cardIdiom: CardIdiom[];
  dataYoutube: any;
  news: any;
  activity: any;
};

export default function HomePage(payload: Props) {
  const { navItem, videoItem, news, activity } = payload;
  const router = useRouter();
  const handleNewsPage = () => {
    return router.push('/news');
  };
  const handleActivityPage = () => {
    return router.push('/activity');
  };
  return (
    <Layout>
      <main className='flex flex-col'>
        <div className='sticky top-0 z-50 bg-primary 2xl:relative 2xl:bg-opacity-0'>
          <div className='2xl:absolute 2xl:w-full 2xl:px-8 2xl:py-4'>
            <Navbar nav-items={navItem['nav-items']} />
          </div>
        </div>
        <section className='z-10 h-[40vh] w-full bg-golkar bg-contain bg-no-repeat sm:h-[72vh] md:h-[86vh] lg:h-[90vh] xl:h-[110vh] 2xl:bg-cover 2xl:bg-fixed 2xl:bg-center'>
          <JoinUs
            image-kita-satu={navItem['image-kita-satu']}
            description={navItem['description']}
            video={videoItem}
          />
        </section>

        <section className='z-10 py-12 px-8'>
          <h1 className='text-2xl text-secondary'>
            <p className='inline font-[900] text-black underline decoration-primary decoration-[7px] underline-offset-8'>
              Sejarah
            </p>{' '}
            Partai Golkar
          </h1>
          <div className='pt-3 pb-2 text-justify text-xs font-[400]'>
            Partai Golongan Karya (Partai Golkar), sebelumnya bernama Golongan
            Karya (Golkar) dan Sekretariat Bersama Golongan Karya (Sekber
            Golkar), Partai Golkar merupakan salah satu partai politik tertua di
            Indonesia. Partai Golkar didirikan pada tanggal 20 Oktober 1964 oleh
            Soeharto dan Suhardiman.
          </div>
          <div className='text-[12px] text-[#1C6A78] underline underline-offset-2'>
            Baca Selengkapnya
          </div>
        </section>
        <section className='relative space-y-2 bg-bgSecondary px-8 py-8'>
          <h1 className='text-2xl font-[600] leading-none text-primary'>
            <p className='inline font-[900] text-black underline decoration-primary decoration-[7px] underline-offset-8'>
              Tantowi
            </p>{' '}
            Jauhari{' '}
            <p className='indent-[92px] text-xs font-[500] text-black '>
              Ketua DPD Partai Golkar
            </p>{' '}
            <p className='indent-[92px] text-xs font-[500]'>
              Kabupaten Sarolangun
            </p>
          </h1>
          <div className='absolute right-0 bottom-0 h-[306px] w-[165px]'>
            <Image
              src='/images/C6.png'
              alt='foto-profile'
              height={306}
              width={165}
              className='opacity-90 drop-shadow-xl'
            />
          </div>
          <p className='font-400 w-[214px] text-justify text-xs'>
            Pada tanggal 15 Maret 2020, Tantowi Jauhari terpilih menjadi Ketua
            DPD Partai Golkar Kabupaten Sarolangun dalam Pemilu 2020. Tantowi
            Jauhari didaulat oleh seluruh pemilik Hak Suara untuk menjadi Ketua
            DPD Partai Golkar Kabupaten Sarolangun Periode 2020-2024.
          </p>
          <div className='flex w-[214px] justify-center'>
            <div className='flex flex-col space-y-2'>
              <div className='flex items-center space-x-2'>
                <span className='rounded-md bg-primary p-[2px]'>
                  <UserIcon className='h-5 w-5' />
                </span>
                <span className='text-xs font-[500] underline'>
                  Profile Pimpinan
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='rounded-md bg-primary p-[2px]'>
                  <ClockIcon className='h-5 w-5' />
                </span>
                <span className='text-xs font-[500] underline'>
                  Visi dan Misi
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='rounded-md bg-primary p-[2px]'>
                  <ChartSquareBarIcon className='h-5 w-5' />
                </span>
                <span className='text-xs font-[500] underline'>
                  Tugas dan Fungsi
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className='flex flex-col space-y-8 p-8'>
          <h1 className=' text-center font-[600] uppercase text-secondary'>
            <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-8'>
              Berita
            </p>{' '}
            terbaru
          </h1>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
            {news.data &&
              news.data.length > 0 &&
              news.data?.map((value, i) => <News key={i} payload={value} />)}
          </div>
          <button
            onClick={handleNewsPage}
            className=' w-[180px] self-center rounded-md bg-primary px-4 py-2 text-[14px] font-[500] text-white'
          >
            Lihat Lebih Banyak
          </button>
        </section>
        <section className='flex flex-col items-center space-y-6 bg-[#2C4062] p-8'>
          <h1 className='font-[600] uppercase text-primary'>
            <p className='inline font-[900] text-white underline decoration-primary decoration-[7px] underline-offset-8'>
              Galeri
            </p>{' '}
            Kegiatan
          </h1>
          <Carousel activity={activity} />
          <button
            onClick={handleActivityPage}
            className=' w-[180px] rounded-md bg-primary px-4 py-2 text-[14px] font-[500] text-white'
          >
            Lihat Lebih Banyak
          </button>
        </section>
        <section className='flex flex-col items-center space-y-6 p-8'>
          <h1 className='font-[600] uppercase text-secondary'>
            <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-8'>
              Media
            </p>{' '}
            Sosial
          </h1>
          <div className='flex w-full flex-col items-center bg-[#3B5998]'>
            <div className='flex items-center space-x-2 p-2 text-white'>
              <span>
                <RiFacebookCircleLine className='h-7 w-7' />
              </span>
              <span className='text-[18px]'>facebook</span>
            </div>
            <iframe
              src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Ffacebook.com%2Fmpogolkarsarolangun&tabs=timeline&width=350&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
              width='350'
              height='500'
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling='no'
              frameBorder={0}
              allowFullScreen={true}
              allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
            ></iframe>
          </div>
        </section>
        <ContactUs />
        <FloatingWhatsApp />
        <Footer />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const navItem = contentOne;
  const videoItem = contentVideo;
  const cardIdiom = contentTwo;
  const newsItem = contentBerita;
  const domain = process.env.DOMAIN_API;
  const address = `${domain}`;
  const getNews = await fetch(`${address}/api/v1/news?page=1&limit=3`);
  const news = await getNews.json();
  const getActivity = await fetch(`${address}/api/v1/activity?page=1&limit=5`);
  const activity = await getActivity.json();
  return {
    props: {
      navItem,
      videoItem,
      cardIdiom,
      newsItem,
      dataYoutube: null,
      news,
      activity,
    },
  };
};
