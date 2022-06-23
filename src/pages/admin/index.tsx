import { Code, Link, Text } from '@vercel/examples-ui'
import React from 'react'

import { weeklyData } from '@/lib/utils/weeklyData'

import { Cards } from '@/components/components/cards/Card'
import { LatestOrders } from '@/components/components/LatestOrders/LatestOrders'
import { Layout } from '@/components/components/Layouts/Layout'

const sampleFetch = `await fetch('/api?edge')
await fetch('/api')`

const index = () => {
  return (
    <Layout>
      <div className="p-5 max-w-7xl mx-auto ">
        <div>
          <div className="py-5">
            <h1 className="text-3xl">Weekly Overview</h1>
          </div>
          <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 ">
            {weeklyData.map((data, index) => (
              <Cards key={index} items={data} />
            ))}
          </div>
          <div className="mb-6">
            <Text className="mb-4 text-center">
              We&apos;ll make a request to <Link href="/api">/api</Link> and{' '}
              <Link href="/api?edge">/api?edge</Link> using your token, where the
              first will hit an API route and the latter will be handled by the
              edge, they&apos;ll return a <Code>nanoid</Code>
            </Text>
            <pre className="border-accents-2 border rounded-md bg-white overflow-x-auto p-6 mb-2">
              {sampleFetch}
            </pre>
          </div>
        </div>
        <LatestOrders />
      </div>
    </Layout>
  )
}

export default index