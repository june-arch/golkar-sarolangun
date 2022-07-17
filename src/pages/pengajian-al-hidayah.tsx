import { GetStaticProps } from 'next'
import React from 'react'

import { contentOne } from '@/lib/resource/nav-data'
import { NavItem } from '@/controller/interface/types'

import Footer from '@/components/landing-page/Footer'
import Layout from '@/components/landing-page/Layout'
import Navbar from '@/components/landing-page/Navbar'

type Props = {
  navItem: NavItem
}

const PengajianAlHidayah = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main>
        <div className="sticky top-0 z-50 bg-yellow-300">
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

export default PengajianAlHidayah
