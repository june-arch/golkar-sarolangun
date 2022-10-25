import dynamic from 'next/dynamic';
import React from 'react';

const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

const index = () => {

  return (
    <Layout>
      <div className='mx-auto max-w-7xl p-5 '>Hello Welcome,</div>
    </Layout>
  );
};

export default index;
