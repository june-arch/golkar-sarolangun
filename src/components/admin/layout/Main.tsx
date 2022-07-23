import { useCheckLogin } from '@/helpers/utils/checkLogin'
import { useRouter } from 'next/router'
import React from 'react'
import { Header } from '../Header'
import { Sidenav } from '../Sidenav'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  if (useCheckLogin()) {
    return (
      <>
        <Sidenav />
        <Header />
        {children}
      </>
    )
  }
  router.push('/admin/auth/login')
  return null
}
