import { Menu } from '@headlessui/react';
import { useContext } from 'react';

import { itemLimit } from '@/components/resource/table-admin';

import { TableContext } from '@/helpers/hooks/use-context';
import { tableProps } from '@/helpers/interface/pagination.interface';

import ContentTable from './ContentTable';

export const Table = ({ title, header, result, id, props }: tableProps) => {
  const {limitState, searchState, pageState} = useContext(TableContext);
  const {
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
  } = props;

  return (
    <div className=''>
      {title && limitState.setLimit && (
        <>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <h1 className='text-2xl font-medium'>{title}</h1>
            {handleAdd && (
              <button
                onClick={() => handleAdd()}
                className=' space-x-3 rounded-md border-2 border-gray-200 p-2 text-gray-600 hover:border-white hover:bg-gray-600 hover:text-white'
              >
                tambah data
              </button>
            )}
          </div>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='flex items-center'>
              <div className='mr-2'>show</div>
              <div className='relative'>
                <Menu>
                  <Menu.Button className='flex space-x-3 rounded-md border-2 border-gray-200 px-10 py-2  text-gray-600'>
                    <span>{limitState.limit}</span>
                  </Menu.Button>
                  <Menu.Items
                    as='div'
                    className='top-ful absolute flex w-full flex-col items-center space-y-2 bg-gray-500'
                  >
                    {itemLimit.map((value, index) => (
                      <Menu.Item key={index}>
                        <a
                          onClick={() => {
                            limitState.setLimit(value);
                            pageState.setPage(1)
                          }}
                          className='flex cursor-pointer space-x-2 px-9 py-1 text-white hover:bg-gray-500'
                        >
                          <span>{value}</span>
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
              <div className='ml-2'>entries</div>
            </div>
            <div className='sm:w-1/6'>
              <form>
                <input
                  type='search'
                  className='form-control m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                  placeholder='Search'
                  value={searchState.search}
                  onChange={(e) => searchState.setSearch(e.target.value)}
                  aria-label='Search'
                  aria-describedby='button-addon2'
                />
              </form>
            </div>
          </div>
        </>
      )}
      <ContentTable
        header={header}
        id={id}
        result={result}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
    </div>
  );
};
