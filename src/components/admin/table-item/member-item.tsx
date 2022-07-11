import { useAppSelector } from "@/lib/redux/hook";
import { selectIsLogin, selectToken } from "@/lib/redux/slice/auth-slice-admin";
import { formatDate } from "@/lib/utils/common";
import { getMembers } from "@/service/admin/member.admin";
import { useState } from "react";
const headerItem = [
    {
        title: "no"
    },
    {
        title: "fullname"
    },

    {
        title: "gender"
    },
    {
        title: "status"
    },
    {
        title: "created"
    },
];
export const MemberItem = ({title}) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const isLogin = useAppSelector(selectIsLogin);
    const token = useAppSelector(selectToken);
    if (isLogin) {
        const { member, isError, isLoading } = getMembers({ page: page.toString(), limit: limit.toString() }, token);
        if (isError) return <div>error fetch data</div>
        if (isLoading) return <div>Loading ...</div>
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
                        {member.data.map(({ fullname, gender, status, created_date }, index) => (
                            <tr key={index}>
                                <td className="text-center ">{(limit * (page - 1)) + (index + 1)}</td>
                                <td className="text-center ">{fullname}</td>
                                <td className="text-center ">{gender}</td>
                                <td className="text-center ">{status}</td>
                                <td className="text-center ">{formatDate(created_date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return null;
}

