import React, { useState } from 'react';
import { MoonLoader } from 'react-spinners';

import Search from '@/components/icon/search';
import Activity from '@/components/landing-page/Activity';
import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';
import PaginationHome from '@/components/landing-page/PaginationHome';

import { useGetAllActivity } from '@/controller/activity/use-activity';
import useDebounce from '@/helpers/hooks/use-debounce';

import { paddingDefault } from '..';

const ActivityFilterComponent = ({ result, props }) => {
  const { setPage, page, limit } = props;
  const { data, isLoading, isError } = result;
  if (isLoading) {
    return (
      <div className='flex justify-center py-8'>
        <MoonLoader />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <PaginationHome setPage={setPage} />
      </div>
    );
  }
  const { data: items, meta } = data;
  return (
    <div className='px-6'>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
        {items && items.map((value, i) => <Activity key={i} payload={value} />)}
      </div>
      <PaginationHome page={page} limit={limit} setPage={setPage} meta={meta} />
    </div>
  );
};

const Content = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const debouncedSearch = useDebounce(searchKeyword, 1000);
  const result = useGetAllActivity({
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
    <div className={`flex flex-col ${paddingDefault}`}>
      <div className='mx-auto py-6 text-center w-full'>
        <div className='text-[38px] font-[900] uppercase text-primary'>
          Galeri
        </div>
        <div className='text-[20px] font-[400] uppercase'>
          Golkar Sarolangun
        </div>
        <div className='my-5 flex space-x-2 w-full justify-center'>
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

      <ActivityFilterComponent result={result} props={props} />
    </div>
  )
}

const ActivityPage = () => {
  return (
    <Layout>
      <div className='sticky top-0 z-50 bg-primary'>
        <Navbar />
      </div>
      <Content />
      <Footer />
    </Layout>
  );
};

export default ActivityPage;
