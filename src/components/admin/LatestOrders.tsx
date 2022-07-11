import { selectIsLogin, selectToken } from "@/lib/redux/slice/auth-slice-admin";
import { tabelHeader } from "@/lib/resource/latest-order-admin";
import { getMembers } from "@/service/admin/member.admin";
import { useState } from "react";
import { useAppSelector } from "../../lib/redux/hook";
import { formatDate } from "../../lib/utils/common";


export const LatestOrders = () => {
  const [page, setPage] = useState('1');
  const [limit, setLimit] = useState('10');
  const isLogin = useAppSelector(selectIsLogin);
  const token = useAppSelector(selectToken);

  if (isLogin) {
    const { member, isError, isLoading } = getMembers({ page, limit }, token);
    if (isError) return <div>error fetch data</div>
    if (isLoading) return <div>Loading ...</div>

    return (
      <div className="">
        <div className="py-6">
          <h1 className="text-2xl font-medium">Member</h1>
        </div>
        <table className="w-full">
          <thead className="bg-gray-600 bg-opacity-20 rounded">
            <tr>
              {tabelHeader.map(({ title }, index) => (
                <th key={index} className="p-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {member.data.map(({ fullname, gender, status, created_date }, index) => (
              <tr key={index}>
                <td className="text-center py-2 text-blue-300">{(Number(limit) * (Number(page) - 1)) + (index + 1)}</td>
                <td className="text-center ">{fullname}</td>
                <td className="text-center ">{gender}</td>
                <td className="text-center ">{status}</td>
                <td className="text-center ">{formatDate(created_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null
};