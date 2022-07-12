import { useAppSelector } from "@/lib/redux/hook";
import { selectIsLogin, selectToken } from "@/lib/redux/slice/auth-slice-admin";
import { paginate } from "@/lib/utils/paginate";
import { getRegions } from "@/service/admin/region.admin";
import { Menu } from "@headlessui/react";
import { useState } from "react";
const headerItem = [
    {
        title: "no"
    },
    {
        title: "name"
    },
    {
        title: "kemendagri_code"
    },
];
const itemLimit = [5,10,20,30,40,50];
const styleNotActive = 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
const styleActive = 'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
export const RegionItem = ({ title }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const isLogin = useAppSelector(selectIsLogin);
    const token = useAppSelector(selectToken);

    if (isLogin) {
        const { region, isError, isLoading } = getRegions({ page: page.toString(), limit: limit.toString() }, token);
        if (isError) return <div>error fetch data with error code: {isError['status']}, {JSON.stringify(isError['info'])}</div>
        if (isLoading) return <div>Loading ...</div>
        const {data, meta} = region;
        const pages = paginate(page, meta.totalPage);
        const handleStyle = (value) => {
            return page == value ? styleActive : styleNotActive;
        }
        return (
            <div>
                <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
                    <h1 className="text-2xl font-medium">{title}</h1>
                    <div className="relative">
                        <Menu>
                            <Menu.Button className="flex px-10 py-2 border-gray-200 border-2 space-x-3 text-gray-600  rounded-md">
                            <span>{limit}</span>
                            </Menu.Button>
                            <Menu.Items as="div" className="absolute bg-gray-500 top-ful w-full items-center flex space-y-2 flex-col">
                                {itemLimit.map((value, index) => (
                                    <Menu.Item key={index}>
                                    <a onClick={() => setLimit(value)} className="flex px-9 py-1 hover:bg-gray-500 text-white space-x-2 cursor-pointer">
                                        <span>{value}</span>
                                    </a>
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-600 bg-opacity-20 rounded">
                        <tr>
                            {headerItem.map(({ title }, index) => (
                                <th key={index} className="p-3">
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ name, kemendagri_code }, index) => (
                            <tr key={index}>
                                <td className="text-center ">{(limit * (page - 1)) + (index + 1)}</td>
                                <td className="text-center ">{name}</td>
                                <td className="text-center ">{kemendagri_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    <ul className="inline-flex items-center -space-x-px">
                        <li className={`${page == 1 ? 'pointer-events-none' : ''}`}>
                            <a onClick={() => setPage(page-1)} className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                        {pages.map((value, index) => {
                            return (
                                <li key={index}>
                                    <a onClick={() => setPage(value)} className={handleStyle(value)}>{value}</a>
                                </li>
                            )
                        })}
                        <li className={`${page == meta.totalPage ? 'pointer-events-none' : ''}`}>
                            <a onClick={() => setPage(page+1)} className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
    return null;
}

