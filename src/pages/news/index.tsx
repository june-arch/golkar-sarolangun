import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import React, { useEffect,useState } from 'react';
import { MoonLoader } from 'react-spinners';

import Search from '@/components/icon/search';
import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import NewsSimple from '@/components/landing-page/NewsSimple';
import PaginationHome from '@/components/landing-page/PaginationHome';

import { getAllNews } from '@/controller/news/news.service';
import { useGetAllNews } from '@/controller/news/use-news';
import { getListNewsCategory } from '@/controller/news-category/news-category.service';
import useDebounce from '@/helpers/hooks/use-debounce';
import { formatDate } from '@/helpers/utils/common';

import { paddingDefault } from '..';

const useFormatedData = (page, limit, debouncedSearch, categoryNewsId, initNews) => {
  const [check, setCheck] = useState(true);
  const {data, isLoading, isError} = useGetAllNews({
    page: page.toString(),
    limit: limit.toString(),
    debouncedSearch,
    category: categoryNewsId.toString(),
  }, check ? initNews : null);
  
  const [news, setNews] = useState(data?.data);
  useEffect(() => {
    const resultNews = data?.data && data?.data.map((item) => {
      item.created_date = item?.created_date && formatDate(item.created_date);
      item['parseContent'] = item.content && parse(item.content);
      return item;
    })
    setNews(resultNews);
    setCheck(false);
  }, [data])
  

  return {items: news, meta:data?.meta, isLoading, isError};
}

const NewsItems = ({ propState }) => {
  const { setPage, page, limit, result } = propState;
  const { items, meta, isLoading, isError } = result;
  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-10'>
          <MoonLoader />
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <PaginationHome setPage={setPage} />
      </div>
    );
  }
  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
        {items && items.map((value, i) => <NewsSimple key={i} payload={value} />)}
      </div>
      <PaginationHome page={page} limit={limit} setPage={setPage} meta={meta} />
    </div>
  );
};

const Content = ({propState}) => {
  const {category, news} = propState;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [navNews, setNavNews] = useState('semua berita');
  const [categoryNewsId, setCategoryNewsId] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchKeyword, 1000);
  const result = useFormatedData(page, limit, debouncedSearch, categoryNewsId, news);

  const handleClick = (val) => {
    setNavNews(val['name']);
    const find = category.find((value) => val['name'] === value['name']);
    if (find) {
      setPage(1);
      setCategoryNewsId(find['id_category_news']);
    }
    return;
  };
  return (
    <div className={`flex flex-col ${paddingDefault}`}>
      <div className='text-center py-6'>
        <div className='text-[38px] font-[900] uppercase text-primary'>
          Berita
        </div>
        <div className='text-[24px] font-[400] uppercase'>
          Golkar Sarolangun
        </div>
        <div className='my-5 flex space-x-2 justify-center'>
          <div className='relative w-1/2 rounded'>
            <span className='absolute top-[15px] left-3 text-gray-700'>
              <Search />
            </span>
            <input
              type='search'
              className='form-control m-0 block h-[47px] w-full min-w-0 flex-auto rounded-md bg-[#EEEEEE] px-4 py-2 indent-5 text-[14px] font-normal text-gray-700'
              placeholder='Search'
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
              autoComplete='off'
            />
          </div>
        </div>
      </div>
      <div className='relative mx-6'>
        <div className=' flex space-x-10 overflow-x-scroll whitespace-nowrap py-4 text-2xl scrollbar-hide sm:px-20'>
          {category &&
            category.map((value, i) => (
              <h2
                key={i}
                onClick={() => handleClick(value)}
                className={`cursor-pointer capitalize ${
                  navNews === value['name']
                    ? 'text-black underline decoration-[7px] underline-offset-[12px]'
                    : 'text-gray-400'
                }`}
              >
                {value['name']}
              </h2>
            ))}
        </div>
        <div className='absolute bottom-[7px] left-0 -z-10 w-full border-2'></div>
      </div>
      <NewsItems propState={{setPage, page, limit, result}} />
    </div>
  )
}

const NewsPage = ({ category, news }) => {
  
  return (
    <Layout>
      <div className='sticky top-0 z-50 bg-primary'>
        <Navbar />
      </div>
      <Content propState={{category, news}}/>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const c = await getListNewsCategory();
  const category = c && c.data;
  category && category.splice(0, 0, { name: 'semua berita', id_category_news: '' });
  const news = await getAllNews({page: '1', limit: '10'});
  return {
    props: {
      category,
      news,
    },
  };
};

export default NewsPage;
