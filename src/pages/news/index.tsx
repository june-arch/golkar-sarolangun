import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

import Search from '@/components/icon/search';
import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import NewsFilterComponent from '@/components/landing-page/NewsFilter';

import useDebounce from '@/helpers/hooks/use-debounce';
import { NavItem } from '@/helpers/interface/types';
import { contentOne } from '@/helpers/resource/nav-data';
import { useGetNewss } from '@/service/landing-page/news';
import { requestCategoryAll } from '@/service/landing-page/news-category';

type Props = {
  navItem: NavItem;
  category: any;
};

const NewsPage = ({ navItem, category }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [navNews, setNavNews] = useState('semua berita');
  const [categoryNewsId, setCategoryNewsId] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchKeyword, 1000);
  const result = useGetNewss({
    page: page.toString(),
    limit: limit.toString(),
    debouncedSearch,
    category: categoryNewsId.toString(),
  });

  const handleClick = (val) => {
    setNavNews(val['name']);
    const find = category.find((value) => val['name'] === value['name']);
    if (find) {
      setCategoryNewsId(find['id_category_news']);
    }
    return;
  };
  const props = {
    setPage,
    page,
    limit,
  };
  return (
    <Layout>
      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <div className='mx-auto p-6 text-center'>
          <div className='text-[32px] font-[900] uppercase text-primary'>
            Berita
          </div>
          <div className='text-[15px] font-[400] uppercase'>
            Golkar Sarolangun
          </div>
          <div className='my-5 flex space-x-2'>
            <div className='relative w-full rounded'>
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
            {/* <button className='flex items-center rounded-md bg-[#EEEEEE] p-2 text-[14px] font-[400] text-gray-700'><span ><RiFilter2Fill className='w-[19px] h-[19px]' /></span> Filters</button> */}
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
        <NewsFilterComponent result={result} props={props} />
        <Footer />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const navItem = contentOne;
  const c = await requestCategoryAll();
  const category = c && c.data;
  category &&
    category.splice(0, 0, { name: 'semua berita', id_category_news: '' });
  return {
    props: {
      navItem,
      category,
    },
  };
};

export default NewsPage;
