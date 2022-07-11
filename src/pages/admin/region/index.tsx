import React from 'react'

import { Table } from '@/components/admin/Table'
import { Layout } from '@/components/admin/layout/Main'
import { tableAdmin } from '@/lib/resource/table-admin'


const index = () => {
  return (
    <Layout>
      <div className="p-5 max-w-7xl mx-auto ">
        <Table title={tableAdmin.REGION} />
      </div>
    </Layout>
  )
}

export default index