import { styleActive, styleNotActive } from '@/components/resource/table-admin';

import { paginate } from '@/helpers/utils/paginate';

type PaginationProps = {
  page?: number;
  limit?: number;
  setPage: (value: number) => void;
  meta?: any;
};

const PaginationHome = ({ page, limit, setPage, meta }: PaginationProps) => {
  const pages = page && meta && paginate(page, meta.totalPage);
  return (
    <div className='mb-2 flex flex-col'>
      <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
        <div className='p-2'>
          {limit && page && meta
            ? `showing ${limit * (page - 1) + 1} to ${
                limit * (page - 1) + meta.totalDataOnPage
              } of ${meta.totalData} entries`
            : 'showing 0 to 0 of 0 entries'}
        </div>
        <ul className='inline-flex items-center -space-x-px'>
          <li className={`${ page ? page == 1 ? 'pointer-events-none' : '' : 'pointer-events-none' }`}>
            <a
              onClick={() => page && setPage(page - 1)}
              className='ml-0 block cursor-pointer rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </li>
          {page && meta && pages.map((value, index) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => setPage(value)}
                    className={page == value ? styleActive : styleNotActive}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          <li className={`${ page && meta ? page == meta.totalPage ? 'pointer-events-none' : '' : 'pointer-events-none' }`}
          >
            <a
              onClick={() => page && setPage(page + 1)}
              className='block cursor-pointer rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <span className='sr-only'>Next</span>
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaginationHome;
