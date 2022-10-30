import { ClockIcon, UserIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { MoonLoader } from 'react-spinners';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import News from '@/components/landing-page/News';

import { getOneNews } from '@/controller/news/news.service';
import { useGetAllNews, useGetOneNews } from '@/controller/news/use-news';
import { dayOfWeekAsString, formatDate } from '@/helpers/utils/common';

const NewsPage = ({ news, days }) => {
  const router = useRouter();
  const id = router.isReady && router.query.id;
  const {
    data: items,
    isError,
    isLoading,
  } = useGetAllNews({ page: '1', limit: '5' });
  const {data} = useGetOneNews({id}, news);
  const handleNewsPage = () => {
    return router.push('/news');
  };
  return (
    <Layout>
      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar />
        </div>
        <div className='mx-auto space-y-2 p-6 text-justify'>
          <div className='line text-[18px] font-[700] uppercase leading-[1.2] text-black'>
            {data.title}
          </div>
          <div className='flex flex-row items-center space-x-3 text-[12px] font-[300] capitalize'>
            <span className='mr-1 rounded-full bg-primary p-1'>
              <UserIcon className='h-3 w-3' />
            </span>
            Oleh {data.author}
            <span className='pr-1'>
              <ClockIcon className='h-4 w-4 text-primary' />
            </span>
            {days}, {formatDate(data.created_date).replace('at', '|')}
          </div>
          <div>
            <Image
              src={data.image}
              alt='detail-berita-1'
              height='60'
              width='200'
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
        <div className='p-6'>
          <div className='flex w-full flex-row items-center justify-center bg-primary p-4 text-[18px] font-[400] uppercase'>
            <p className='font-[900]'>Berita</p> Terbaru
          </div>
        </div>
        <div className='flex flex-col items-center space-y-8 p-6'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
            {isLoading ? ( <MoonLoader /> ) : ( items?.data.map((value, i) => <News key={i} payload={value} />))}
          </div>
          <button
            onClick={handleNewsPage}
            className=' w-[180px] rounded-md bg-primary px-4 py-2 text-[14px] font-[500] text-white'
          >
            Lihat Lebih Banyak
          </button>
        </div>
        <Footer />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const i = context.params.id;
  const id = Array.isArray(i) ? i[0] : i;
  const news = await getOneNews({ id });
  if (!news.success) {
    news.data = {
      title: 'judul news',
      author: 'author',
      category: 'category',
      image: '',
      created_date: new Date(),
      content: 'content',
    };
  }
  const days = dayOfWeekAsString(new Date(news.data.created_date).getDay());
  return {
    props: {
      news: news.data,
      days,
    },
  };
};

export default NewsPage;
