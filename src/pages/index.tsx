import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import * as React from 'react';

import {
  contentBerita,
  contentOne,
  contentTwo,
  contentVideo,
} from '@/lib/data';
import { CardIdiom, NavItem, NewsItem, VideoItem } from '@/controller/interface/types';

import Card from '@/components/landing-page/Card';
import ContactUs from '@/components/landing-page/ContactUs';
import Footer from '@/components/landing-page/Footer';
import JoinUs from '@/components/landing-page/JoinUs';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import News from '@/components/landing-page/News';
import FloatingWhatsApp from '@/components/landing-page/FloatingWhatsapp';

// const axios = request.default;
type Props = {
  navItem: NavItem;
  videoItem: VideoItem[];
  newsItem: NewsItem[];
  cardIdiom: CardIdiom[];
};

export default function HomePage({
  navItem,
  videoItem,
  newsItem,
  cardIdiom,
}: Props) {
  const Player = dynamic(() => import('@/components/landing-page/Video'));
  return (
    <Layout>

      <main className='flex flex-col'>
        <div className='sticky top-0 z-50 bg-yellow-300 2xl:relative 2xl:bg-opacity-0'>
          <div className='2xl:absolute 2xl:w-full 2xl:px-8 2xl:py-4'>
            <Navbar nav-items={navItem['nav-items']} />
          </div>
        </div>
        <section className='z-10 h-[40vh] w-full bg-golkar bg-contain bg-no-repeat sm:h-[72vh] md:h-[86vh] lg:h-[90vh] xl:h-[110vh] 2xl:bg-cover 2xl:bg-fixed 2xl:bg-center'>
          <div className='sm:mt-16 sm:block sm:py-10 md:mt-20 lg:mt-32 xl:py-10 2xl:mt-52'>
            <JoinUs
              image-kita-satu={navItem['image-kita-satu']}
              description={navItem['description']}
            />
          </div>
        </section>

        <section className='z-0 m-0 mt-10 w-full bg-none bg-contain bg-center bg-no-repeat p-0 sm:px-10 xl:h-[450px] xl:bg-golkar-grey'>
          <div className='bg-white bg-opacity-75'>
            <div className='grid grid-cols-1 gap-0 p-2 sm:grid-cols-1 sm:p-0 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'>
              {cardIdiom.map((item, i) => (
                <Card key={i} payload={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className='flex flex-col sm:p-10'>
          <div className='md:text4xl pl-4 text-left text-2xl sm:text-3xl lg:text-5xl xl:mt-10'>
            Berita
          </div>
          <div className='text-md my-5 pr-4 text-right text-cyan-400 lg:text-xl'>
            Lihat Semua
          </div>
          <div className='grid grid-cols-1 gap-5 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
            {newsItem.map((value, i) => (
              <News key={i} payload={value} />
            ))}
          </div>
        </section>

        <section className='bg-footer bg-cover bg-center bg-no-repeat sm:px-10'>
          <div className='py-8 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
            <div className='sm:mt-10'>Mars & Hymne</div>
            <div className=''>Partai Golkar</div>
          </div>
          <div className='flex flex-col justify-center p-4 xl:flex-row'>
            {videoItem.map((value, i) => (
              <Player key={i} payload={value} />
            ))}
          </div>
        </section>

        <ContactUs />
        <FloatingWhatsApp />
        <Footer />
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const navItem = contentOne;
  const videoItem = contentVideo;
  const cardIdiom = contentTwo;
  const newsItem = contentBerita;
  return {
    props: {
      navItem,
      videoItem,
      cardIdiom,
      newsItem,
    },
  };
};
