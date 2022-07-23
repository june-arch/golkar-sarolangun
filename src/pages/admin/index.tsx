import React from 'react'

import { Table } from '@/components/admin/Table'
import { Layout } from '@/components/admin/layout/Main'
import { headerItemMembers } from '@/helpers/resource/table-admin'
import Swal from 'sweetalert2'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-slice-admin'
import { useGetMembers } from '@/service/admin/member.admin'

function GetMemberSwr() {
  const token = useAppSelector(selectToken)
  const { member, isError, isLoading } = useGetMembers(
    { page: '1', limit: '10' },
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
  const { data } = member
  return (
    <Table
      title="Regions"
      header={headerItemMembers}
      data={data}
      page={1}
      limit={10}
    >
    </Table>
  )
}

const index = () => {
  return (
    <Layout>
      <div className="p-5 max-w-7xl mx-auto ">
        <button
          onClick={() => {
            Swal.fire('Any fool can use a computer')
          }}
        >
          button sweet allert
        </button>
        <GetMemberSwr />
      </div>
    </Layout>
  )
}

export default index
