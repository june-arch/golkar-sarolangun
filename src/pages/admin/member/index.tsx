import React, { useState } from 'react'

import { Table } from '@/components/admin/Table'
import { Layout } from '@/components/admin/layout/Main'
import { headerItemMembers, styleActive, styleNotActive } from '@/helpers/resource/table-admin'
import Swal from 'sweetalert2'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice'
import { deleteMember, useGetMembers } from '@/service/admin/member.admin'
import { useRouter } from 'next/router'
import { paginate } from '@/helpers/utils/paginate'

function GetMemberSwr() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const router = useRouter()

    const token = useAppSelector(selectToken)

    async function handleAdd() {
        return router.push('/admin/member/tambah')
    }
    async function handleEdit(id: string) {
        return router.push(`/admin/member/edit/${id}`)
    }
    async function handleDelete(id: string) {
        const result = await deleteMember(id, token)
        if (result.code !== 200) {
            alert('failed delete data')
        }
        return router.reload()
    }
    const { member, isError, isLoading } = useGetMembers(
        { page: page.toString(), limit: limit.toString() },
        token
    )
    if (isError)
        return (
            <div>
                error fetch data with error code: {isError['status']},{' '}
                {JSON.stringify(isError['info'])}
            </div>
        )
    if (isLoading) return <div>Loading ...</div>
    const { data, meta } = member;
    const pages = paginate(page, meta.totalPage);
    return (
        <Table
            title="Members"
            header={headerItemMembers}
            data={data}
            page={page}
            limit={limit}
            setLimit={setLimit}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
            id="id_member"
        >
            <nav
                aria-label="Page navigation"
                className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between"
            >
                <div className="p-2">
                    showing {limit * (page - 1) + 1} to{' '}
                    {limit * (page - 1) + meta.totalDataOnPage} of {meta.totalData}{' '}
                    entries
                </div>
                <ul className="inline-flex items-center -space-x-px">
                    <li className={`${page == 1 ? 'pointer-events-none' : ''}`}>
                        <a
                            onClick={() => setPage(page - 1)}
                            className="cursor-pointer block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </li>
                    {pages.map((value, index) => {
                        return (
                            <li key={index}>
                                <a
                                    onClick={() => setPage(value)}
                                    className={page == value ? styleActive : styleNotActive}
                                >
                                    {value}
                                </a>
                            </li>
                        )
                    })}
                    <li
                        className={`${page == meta.totalPage ? 'pointer-events-none' : ''}`}
                    >
                        <a
                            onClick={() => setPage(page + 1)}
                            className="cursor-pointer block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </Table>
    )
}

const index = () => {
    return (
        <Layout>
            <div className="p-5 max-w-7xl mx-auto ">
                <GetMemberSwr />
            </div>
        </Layout>
    )
}

export default index
