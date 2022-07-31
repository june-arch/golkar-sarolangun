import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { contentOne } from '@/helpers/resource/nav-data'
import { NavItem } from '@/helpers/interface/types'

import Footer from '@/components/landing-page/Footer'
import Layout from '@/components/landing-page/Layout'
import Navbar from '@/components/landing-page/Navbar'

type Props = {
  navItem: NavItem
}

const Eksekutif = ({ navItem }: Props) => {
  return (
    <Layout>
      <main>
        <div className="sticky top-0 z-50 bg-primary">
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className="mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]"></section>
        <Footer />
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const navItem = contentOne
  return {
    props: {
      navItem,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}
export default Eksekutif
