
import Pagination from './Pagination'
import { formatDate, isDate } from '@/helpers/utils/common'
import Swal from 'sweetalert2'
import MoonLoader from 'react-spinners/MoonLoader'

const ContentTable = ({ header, id, result, limit, page, setPage, handleDelete, handleEdit, handleView }) => {
    const { data, isError, isLoading } = result;
    if (isLoading) {
        return (
            <div className='flex justify-center'>
                <MoonLoader />
            </div>
        )
    }
    if (isError) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: `Error : ( ${isError['info']['message']} )`,
            color: 'red',
        })
        return (
            <table>
                <tbody className="flex-1 sm:flex-none">
                    <Pagination
                        setPage={setPage} />
                </tbody>
            </table>
        );
  }
    const { data: items, meta } = data;
    return (
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="">
                {items && items.map((value, index) => {
                    return (
                        <tr key={index} className='bg-gray-600 bg-opacity-20 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
                            <th className="p-3 text-left sm:text-center sm:w-1/12">no</th>
                            {header.map((title, index) => (
                                <th key={index} className="p-3 text-left">
                                    {title.replace('_', ' ').trim()}
                                </th>
                            ))}
                            {handleEdit && handleDelete && <th className="p-[14px] sm:p-3 text-left sm:text-center sm:w-2/12">Action</th>}
                        </tr>
                    )
                })}
            </thead>
            <tbody className="flex-1 sm:flex-none">
                {items.map((value, index) => (
                    <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="p-3 sm:text-center sm:w-1/12 border-grey-light border">
                            {limit * (page - 1) + (index + 1)}
                        </td>
                        {header.map((title, i) => (
                            <td key={i} className="text-left p-3 border-grey-light border">
                                {isDate(value[title])
                                    ? formatDate(value[title])
                                    : value[title]}
                            </td>
                        ))}
                        {handleEdit && handleDelete && (
                            <td className="p-3 sm:text-center sm:w-2/12 border-grey-light border">
                                <a
                                    onClick={() => handleView(value)}
                                    className="text-gray-500 cursor-pointer"
                                >
                                    <button className="w-[80px] rounded-md border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition">
                                        Lihat
                                    </button>
                                </a>
                                <a
                                    onClick={() => handleEdit(value[id])}
                                    className="text-gray-500 cursor-pointer"
                                >
                                    <button className="w-[80px] rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-white transition">
                                        Edit
                                    </button>
                                </a>
                                <a
                                    onClick={() => handleDelete(value[id])}
                                    className="text-red-500 cursor-pointer"
                                >
                                    <button className="w-[80px] rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-white transition">
                                        Hapus
                                    </button>
                                </a>
                            </td>
                        )}
                    </tr>
                ))}
                <Pagination
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    meta={meta} />
            </tbody>
        </table>

    )
}
export default ContentTable;