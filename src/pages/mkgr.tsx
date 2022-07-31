import { GetStaticProps } from 'next'
import React from 'react'

import { contentOne } from '@/helpers/resource/nav-data'
import { NavItem } from '@/helpers/interface/types'

import Footer from '@/components/landing-page/Footer'
import Layout from '@/components/landing-page/Layout'
import Navbar from '@/components/landing-page/Navbar'
import Image from 'next/image'
import styles from "@/styles/img.module.css"

type Props = {
  navItem: NavItem
}

const Mkgr = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main>
        <div className="sticky top-0 z-50 bg-primary">
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className="mx-auto flex flex-col items-center p-4 sm:flex-row sm:items-start lg:w-[90vh] xl:w-[110vh]">

	<div className="items-center justify-center bg-light self-center">
        <div className={styles.pictures}>
        <div className={styles.img}>
	<Image
                  src="/images/mkgr.png"
                  alt="ormas mkgr"
                  height={1200}
                  width={1149}
                  objectFit="contain"
        />
	</div>
	</div>
	</div>


	</section>
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

export default Mkgr
