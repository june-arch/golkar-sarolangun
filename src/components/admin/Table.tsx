import { tableProps } from '@/helpers/interface/pagination.interface'
import { itemLimit } from '@/helpers/resource/table-admin'
import { Menu } from '@headlessui/react'
import ContentTable from './ContentTable';


export const Table = ({
  title,
  header,
  result,
  id,
  props,
}: tableProps) => {
  const { page, limit, setLimit, setPage, handleAdd, handleDelete, handleEdit, searchKeyword, debouncedSearch, setSearchKeyword, handleView  } = props;

  return (
    <div className="">
      {title && setLimit && (
        <>
          <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
            <h1 className="text-2xl font-medium">{title}</h1>
            {handleAdd && (
              <button
                onClick={() => handleAdd()}
                className=" p-2 border-gray-200 border-2 space-x-3 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white hover:border-white"
              >
                tambah data
              </button>
            )}
          </div>
          <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
            <div className="flex items-center">
              <div className="mr-2">show</div>
              <div className="relative">
                <Menu>
                  <Menu.Button className="flex px-10 py-2 border-gray-200 border-2 space-x-3 text-gray-600  rounded-md">
                    <span>{limit}</span>
                  </Menu.Button>
                  <Menu.Items
                    as="div"
                    className="absolute bg-gray-500 top-ful w-full items-center flex space-y-2 flex-col"
                  >
                    {itemLimit.map((value, index) => (
                      <Menu.Item key={index}>
                        <a
                          onClick={() => setLimit(value)}
                          className="flex px-9 py-1 hover:bg-gray-500 text-white space-x-2 cursor-pointer"
                        >
                          <span>{value}</span>
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
              <div className="ml-2">entries</div>
            </div>
            <div className="sm:w-1/6">
              <form>
                  <input
                    type="search"
                    className="form-control m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    aria-label="Search"
                    aria-describedby="button-addon2"
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
          limit={limit}
          page={page}
          setPage={setPage}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleView={handleView}
        />
    </div>
  )
}
