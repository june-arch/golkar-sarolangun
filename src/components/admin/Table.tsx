import { itemLimit } from '@/lib/resource/table-admin'
import { formatDate, isDate } from '@/lib/utils/common'
import { Menu } from '@headlessui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'

type Props = {
  title: string
  header: string[]
  data: any[]
  page?: number
  limit?: number
  setLimit?: (value: number) => void
  handleDelete?: (value: string) => void
  handleEdit?: (value: string) => void
  handleAdd?: () => void
  id?: string
  children?: React.ReactNode
}

export const Table = ({
  title,
  header,
  data,
  page,
  limit,
  setLimit,
  handleDelete,
  handleEdit,
  handleAdd,
  id,
  children,
}: Props) => {
  return (
    <div className="">
      {title && setLimit && handleAdd && (
        <>
          <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
            <h1 className="text-2xl font-medium">{title}</h1>
            <button
              onClick={() => handleAdd()}
              className=" p-2 border-gray-200 border-2 space-x-3 text-gray-600 rounded-md hover:bg-gray-600 hover:text-white hover:border-white"
            >
              tambah data
            </button>
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
              <input
                type="search"
                className="form-control m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
          </div>
        </>
      )}
      <table className="w-full">
        <thead className="bg-gray-600 bg-opacity-20 rounded">
          <tr>
            <th className="p-3">no</th>
            {header.map((title, index) => (
              <th key={index} className="p-3">
                {title}
              </th>
            ))}
            {handleEdit && handleDelete && <th className="p-3">action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => (
            <tr key={index}>
              <td className="text-center ">
                {limit * (page - 1) + (index + 1)}
              </td>
              {header.map((title, i) => (
                <td key={i} className="text-center">
                  {isDate(value[title])
                    ? formatDate(value[title])
                    : value[title]}
                </td>
              ))}
              {handleEdit && handleDelete && (
                <td className="text-center flex justify-center">
                  <a
                    onClick={() => handleEdit(value[id])}
                    className=" text-gray-500 cursor-pointer"
                  >
                    <span>
                      <PencilIcon className="h-7 w-7 text-2xl " />
                    </span>
                  </a>
                  <a
                    onClick={() => handleDelete(value[id])}
                    className=" text-red-500 cursor-pointer"
                  >
                    <span>
                      <TrashIcon className="h-7 w-7 text-2xl " />
                    </span>
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  )
}
