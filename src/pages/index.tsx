import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import * as React from 'react';

import ContactUs from '@/components/landing-page/ContactUs';
import FloatingWhatsApp from '@/components/landing-page/FloatingWhatsapp';
import Footer from '@/components/landing-page/Footer';
import BeritaTerbaru from '@/components/landing-page/home/BeritaTerbaru';
import GaleriKegiatan from '@/components/landing-page/home/GaleriKegiatan';
import ProfilPimpinan from '@/components/landing-page/home/ProfilPimpinan';
import SejarahPartaiGolkar from '@/components/landing-page/home/SejarahPartaiGolkar';
import JoinUs from '@/components/landing-page/JoinUs';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

import { getAllActivity } from '@/controller/activity/activity.service';
import { getAllNews } from '@/controller/news/news.service';
import { StateHomePage } from '@/helpers/hooks/use-context';
import { formatDate } from '@/helpers/utils/common';

export const paddingDefault = 'lg:px-2 lg:max-w-screen-lg mx-auto';
export const padding = 'px-8 py-8';

export default function HomePage(payload) {
  const { news:dataNews, activity:dataActivity } = payload;
  const {news, activity } = React.useContext(StateHomePage);
  React.useEffect(() => {
    const resultNews = dataNews.data.map((item) => {
      item['parseContent'] = item.content && parse(item.content);
      return item;
    })
    news.setData(resultNews);
    activity.setData(dataActivity.data)
  }, [])
 

  return (
    <Layout>
      <main className='flex flex-col'>
        <div className='sticky top-0 z-50 bg-primary 2xl:relative 2xl:bg-opacity-0'>
          <div className='2xl:absolute 2xl:w-full 2xl:px-8 2xl:py-4'>
            <Navbar />
          </div>
        </div>
        <JoinUs />
        <SejarahPartaiGolkar />
        <ProfilPimpinan />
        <BeritaTerbaru />
        <GaleriKegiatan />
        {/* <MediaSosial /> */}
        <ContactUs />
        <FloatingWhatsApp />
        <Footer />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const news = await getAllNews({page: '1', limit: '3'});
  const activity = await getAllActivity({page: '1', limit: '5'});
  news.data.map((item) => {
    item.created_date = item?.created_date && formatDate(item.created_date);
    return item;
  })
  return {
    props: {
      news,
      activity,
    },
  };
};
