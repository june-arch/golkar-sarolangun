import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import id from 'javascript-time-ago/locale/id.json';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import * as React from 'react';

import {
  contentBerita,
  contentOne,
  contentTwo,
  contentVideo,
} from '@/lib/data';
import { CardIdiom, NavItem, NewsItem, VideoItem } from '@/lib/types';

import Card from '@/components/layout/Card';
import ContactUs from '@/components/layout/ContactUs';
import Footer from '@/components/layout/Footer';
import JoinUs from '@/components/layout/JoinUs';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import News from '@/components/layout/News';
import Seo from '@/components/Seo';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(id);

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
  const Player = dynamic(() => import('@/components/layout/Video'));
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex flex-col'>
        <div className='sticky top-0 z-50 2xl:hidden'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className='z-10 h-[40vh] w-full bg-golkar bg-contain bg-no-repeat sm:h-[72vh] md:h-[86vh] lg:h-[90vh] xl:h-[110vh] 2xl:bg-cover 2xl:bg-fixed 2xl:bg-center'>
          <div className='z-50 mt-6 hidden 2xl:block'>
            <Navbar nav-items={navItem['nav-items']} />
          </div>
          <div className='hidden sm:mt-16 sm:block sm:py-10 md:mt-20 lg:mt-40 xl:mt-10 xl:py-10'>
            <JoinUs
              image-kita-satu={navItem['image-kita-satu']}
              description={navItem['description']}
            />
          </div>
        </section>

        <section className='sm:hidden'>
          <JoinUs
            image-kita-satu={navItem['image-kita-satu']}
            description={navItem['description']}
          />
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

        <section className='2xl:p-20'>
          <div className='bg-contain bg-center 2xl:flex 2xl:h-[1000px] 2xl:flex-col 2xl:items-center 2xl:self-center 2xl:bg-golkar-video'>
            <div className='md:text4xl pb-10 text-center text-2xl sm:text-3xl lg:text-5xl 2xl:pt-20'>
              <div className='sm:mt-10'>Mars & Hymne</div>
              <div className=''>Partai Golkar</div>
            </div>
            <div className='flex flex-col p-4 2xl:flex-row 2xl:px-36'>
              {videoItem.map((value, i) => (
                <Player key={i} payload={value} />
              ))}
            </div>
          </div>
        </section>

        <ContactUs />
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
