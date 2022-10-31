import { ClockIcon, UserIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import NewsSimple from '@/components/landing-page/NewsSimple';
import LoadingScreen from '@/components/loading/LoadingScreen';

import { getAllNews, getOneNews } from '@/controller/news/news.service';
import { useGetAllNews, useGetOneNews } from '@/controller/news/use-news';
import { dayOfWeekAsString, formatDate } from '@/helpers/utils/common';

import { paddingDefault } from '..';

const useFormatedData = (router, news, allNews) => {
  const id = router.isReady && router.query.id;
  const {data, isLoading: isLoadingOne} = useGetOneNews({id}, news);
  const { data: items, isLoading } = useGetAllNews({ page: '1', limit: '5' }, allNews);
  const [oneNews, setOneNews] = useState(news);
  const [all, setAll] = useState(allNews.data);
  useEffect(() => {
    const {data: item} = data;
    item.created_date = item.created_date && formatDate(item.created_date);
    item['parseContent'] = item.content && parse(item.content);
    setOneNews(item);
    const resultNews = items.data.map((item) => {
      item.created_date = item?.created_date && formatDate(item.created_date);
      item['parseContent'] = item.content && parse(item.content);
      return item;
    })
    setAll(resultNews);
    return;
  }, [data, items]);
  return {data:oneNews, items:all, isLoadingOne, isLoading};
}

const Content = ({payload}) => {
  const {data, items, days} = payload;
  const router = useRouter();
  const handleNewsPage = () => {
    return router.push('/news');
  };
  return (
    <div className={`flex flex-col ${paddingDefault}`}>
      <div className='mx-auto space-y-2 p-6 text-justify'>
        <div className='line text-[24px] font-[700] uppercase leading-[1.2] text-black'>
          {data.title}
        </div>
        <div className='flex flex-row items-center space-x-3 text-[14px] font-[300] capitalize'>
          <span className='mr-1 rounded-full bg-primary p-1'>
            <UserIcon className='h-3 w-3' />
          </span>
          Oleh {data.author}
          <span className='pr-1'>
            <ClockIcon className='h-4 w-4 text-primary' />
          </span>
          {days}, {data.created_date}
        </div>
        <div>
        <div className='relative'>
          <Image
              src={data.image}
              alt={`image-${data.title}`}
              height='300'
              width='4000'
            />
        </div>
        </div>
        <div>{data.parseContent}</div>
      </div>
      <div className='p-6'>
        <div className='flex w-full flex-row items-center justify-center bg-primary p-4 text-[18px] font-[400] uppercase'>
          <p className='font-[900]'>Berita</p> Terbaru
        </div>
      </div>
      <div className='flex flex-col items-center space-y-8 py-6 sm:px-6 lg:px-0'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
          {items.map((value, i) => <NewsSimple key={i} payload={value} />)}
        </div>
        <button
          onClick={handleNewsPage}
          className=' w-[240px] rounded-md bg-primary px-4 py-2 text-[18px] font-[500] text-white'
        >
          Lihat Lebih Banyak
        </button>
      </div>
    </div>
  )
}

const NewsPage = ({ news, days, allNews }) => {
  const router = useRouter();
  const {data, items, isLoading, isLoadingOne} = useFormatedData(router, news, allNews);
  if(isLoadingOne || isLoading) return <LoadingScreen/>;
  return (
    <Layout>
      <div className='sticky top-0 z-50 bg-primary'>
        <Navbar />
      </div>
      <Content payload={{data, items, days}}/>
      <Footer />
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
  const allNews = await getAllNews({ page: '1', limit: '5' });
  const days = dayOfWeekAsString(new Date(news.data.created_date).getDay());
  return {
    props: {
      news,
      days,
      allNews,
    },
  };
};

export default NewsPage;
