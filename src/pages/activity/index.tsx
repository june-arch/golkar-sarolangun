import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

import Search from '@/components/icon/search';
import ActivityFilterComponent from '@/components/landing-page/ActivityFilter';
import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

import useDebounce from '@/helpers/hooks/use-debounce';
import { NavItem } from '@/helpers/interface/types';
import { contentOne } from '@/components/resource/navigation';
import { useGetActivitys } from '@/service/landing-page/activity';

type Props = {
  navItem: NavItem;
};

const ActivityPage = ({ navItem }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearch = useDebounce(searchKeyword, 1000);
  const result = useGetActivitys({
    page: page.toString(),
    limit: limit.toString(),
    debouncedSearch,
  });

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
            Galeri
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

        <ActivityFilterComponent result={result} props={props} />
        <Footer />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const navItem = contentOne;
  return {
    props: {
      navItem,
    },
  };
};

export default ActivityPage;
