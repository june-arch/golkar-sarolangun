import { useAppSelector } from "@/lib/redux/hook";
import { selectIsLogin, selectToken } from "@/lib/redux/slice/auth-slice-admin";
import { paginate } from "@/lib/utils/paginate";
import { getRegions } from "@/service/admin/region.admin";
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
        const pages = paginate(page, region.meta.totalPage);
        const handleStyle = (value) => {
            if (page == value) {
                return styleActive;
            } else {
                let styleA = styleNotActive;
                if (value == '...') {
                    styleA = styleA + ' pointer-events-none';
                }
                return styleA;
            }
        }
        return (
            <div>
                <div className="py-6">
                    <h1 className="text-2xl font-medium">{title}</h1>
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
                        {region.data.map(({ name, kemendagri_code }, index) => (
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
                            <a href="#" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </li>
                        {pages.map((value, index) => {
                            return (
                                <li key={index}>
                                    <a href="#" className={handleStyle(value)}>{value}</a>
                                </li>
                            )
                        })}
                        <li className={`${page == region.meta.totalPage ? 'pointer-events-none' : ''}`}>
                            <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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

