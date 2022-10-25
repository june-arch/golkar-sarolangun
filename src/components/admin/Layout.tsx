import Router from 'next/router';
import React from 'react';
import { MoonLoader } from 'react-spinners';

import { useCheckTokenLogin } from '@/helpers/hooks/use-check-token';

import Header from './Header';
import { Sidenav } from './Sidenav';

const Layout = ({ children }: { children: React.ReactNode}) => {
  const {isLoading, data} = useCheckTokenLogin();
  if(!isLoading) {
    if(!data) {
      Router.push('/admin/auth/login')
      return <></>
    }
    return (
      <>
        <Sidenav />
        <Header />
        {children}
      </>
    );
  }
  return <div className='flex justify-center items-center h-screen'>
    <MoonLoader />
  </div>;
};
export default Layout;