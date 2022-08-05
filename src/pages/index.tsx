import { GetServerSideProps } from 'next'
import * as React from 'react'

import {
  contentBerita,
  contentOne,
  contentTwo,
  contentVideo,
} from '@/helpers/resource/nav-data'
import {
  CardIdiom,
  NavItem,
  NewsItem,
  VideoItem,
} from '@/helpers/interface/types'
import ContactUs from '@/components/landing-page/ContactUs'
import Footer from '@/components/landing-page/Footer'
import JoinUs from '@/components/landing-page/JoinUs'
import Layout from '@/components/landing-page/Layout'
import Navbar from '@/components/landing-page/Navbar'
import News from '@/components/landing-page/News'
import FloatingWhatsApp from '@/components/landing-page/FloatingWhatsapp'
import Youtube from '@/components/landing-page/Youtube'
import Image from 'next/image'
import { ChartSquareBarIcon, ClockIcon, UserIcon } from '@heroicons/react/outline'
import Carousel from '@/components/landing-page/Carousel'
import { RiFacebookCircleFill, RiFacebookCircleLine } from 'react-icons/ri'
import Link from 'next/link'
import Facebook from '@/components/icon/facebook'
import { useGetActivities } from '@/service/landing-page/activity'

// const axios = request.default;
type Props = {
  navItem: NavItem
  videoItem: VideoItem[]
  newsItem: NewsItem[]
  cardIdiom: CardIdiom[]
  dataYoutube: any,
  news: any,
  activity: any
}

export default function HomePage({
  navItem,
  videoItem,
  newsItem,
  cardIdiom,
  dataYoutube,
  news,
  activity,
}: Props) {
  return (
    <Layout>
      <main className="flex flex-col">
        <div className="sticky top-0 z-50 bg-primary 2xl:relative 2xl:bg-opacity-0">
          <div className="2xl:absolute 2xl:w-full 2xl:px-8 2xl:py-4">
            <Navbar nav-items={navItem['nav-items']} />
          </div>
        </div>
        <section className="z-10 h-[40vh] w-full bg-golkar bg-contain bg-no-repeat sm:h-[72vh] md:h-[86vh] lg:h-[90vh] xl:h-[110vh] 2xl:bg-cover 2xl:bg-fixed 2xl:bg-center">
         <JoinUs
            image-kita-satu={navItem['image-kita-satu']}
            description={navItem['description']}
            video={videoItem}
          />
        </section>

        <section className="z-10 py-12 px-8">
            <h1 className="text-2xl text-secondary"><p className="inline text-black underline-offset-4 underline decoration-[7px] decoration-primary font-[900]">Sejarah</p> Partai Golkar</h1>
            <div className="pt-3 pb-2 text-xs font-[400] text-justify">
              Partai Golongan Karya (Partai Golkar), sebelumnya bernama Golongan Karya (Golkar) dan Sekretariat Bersama Golongan Karya (Sekber Golkar), Partai Golkar merupakan salah satu partai politik tertua di Indonesia. Partai Golkar didirikan pada tanggal 20 Oktober 1964 oleh Soeharto dan Suhardiman.
            </div>
            <div className="underline text-[12px] text-[#1C6A78] underline-offset-2">
              Baca Selengkapnya
            </div>
        </section>
        <section className="relative bg-bgSecondary px-8 py-8 space-y-2">
            <h1 className="text-2xl text-primary font-[600] leading-none"><p className="inline text-black underline-offset-4 underline decoration-[7px] decoration-primary font-[900]">Tantowi</p> Jauhari <p className="font-[500] text-xs indent-[92px] text-black ">Ketua DPD Partai Golkar</p> <p className="font-[500] text-xs indent-[92px]">Kabupaten Sarolangun</p></h1>
            <div className="absolute h-[306px] w-[165px] right-0 bottom-0">
              <Image
                src="/images/C6.png"
                alt="foto-profile"
                height={306}
                width={165}
                className="drop-shadow-xl opacity-90"
              />
            </div>
            <p className="text-xs font-400 text-justify w-[214px]">
              Pada tanggal 15 Maret 2020, Tantowi Jauhari terpilih menjadi Ketua DPD Partai Golkar Kabupaten Sarolangun dalam Pemilu 2020. Tantowi Jauhari didaulat oleh seluruh pemilik Hak Suara untuk menjadi Ketua DPD Partai Golkar Kabupaten Sarolangun Periode 2020-2024.
            </p>
            <div className="flex justify-center w-[214px]">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <span className="bg-primary p-[2px] rounded-md"><UserIcon className="h-5 w-5"/></span>
                  <span className="underline font-[500] text-xs">Profile Pimpinan</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="bg-primary p-[2px] rounded-md"><ClockIcon className="h-5 w-5"/></span>
                  <span className="underline font-[500] text-xs">Visi dan Misi</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="bg-primary p-[2px] rounded-md"><ChartSquareBarIcon className="h-5 w-5"/></span>
                  <span className="underline font-[500] text-xs">Tugas dan Fungsi</span>
                </div>       
              </div>
            </div>
        </section>
        <section className="flex flex-col p-8 space-y-8">
          <h1 className=" text-center uppercase text-secondary font-[600]"><p className="inline text-black underline-offset-4 underline decoration-[7px] decoration-secondary font-[900]">Berita</p> terbaru</h1>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {news.data && news.data.length > 0 && news.data?.map((value, i) => (
              <News key={i} payload={value} />
            ))}
          </div>
        </section>
        <section className="flex flex-col items-center p-8 bg-[#2C4062] space-y-6"> 
          <h1 className="uppercase text-primary font-[600]"><p className="inline text-white underline-offset-4 underline decoration-[7px] decoration-primary font-[900]">Galeri</p> Kegiatan</h1>
          <Carousel activity={activity}/>
          <button className=" bg-primary rounded-md text-white font-[500] text-[14px] w-[180px] px-4 py-2">Lihat Lebih Banyak</button>
        </section>
        <section className="flex flex-col items-center p-8 space-y-6"> 
          <h1 className="uppercase text-secondary font-[600]"><p className="inline text-black underline-offset-4 underline decoration-[7px] decoration-secondary font-[900]">Media</p> Sosial</h1>
          <div className='w-full bg-[#3B5998] flex flex-col items-center'>
            <div className="flex space-x-2 items-center text-white p-2">
              <span><RiFacebookCircleLine className="h-7 w-7"/></span>
              <span className="text-[18px]">facebook</span>
            </div>
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Ffacebook.com%2Fmpogolkarsarolangun&tabs=timeline&width=350&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
              width="350" 
              height="500" 
              style={{border:"none", overflow:"hidden",}} 
              scrolling="no" 
              frameBorder={0} 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
              </iframe>
          </div>
        </section>
        <ContactUs />
        <FloatingWhatsApp />
        <Footer />
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const navItem = contentOne
  const videoItem = contentVideo
  const cardIdiom = contentTwo
  const newsItem = contentBerita
  const domain = process.env.DOMAIN_API
  const address = `${domain}`
  const getNews = await fetch(`${address}/api/v1/news?page=1&limit=3`);
  const news = await getNews.json();
  const getActivity = await fetch(`${address}/api/v1/activity?page=1&limit=3`);
  const activity = await getActivity.json();
  return {
    props: {
      navItem,
      videoItem,
      cardIdiom,
      newsItem,
      dataYoutube: null,
      news,
      activity,

    },
  }
}
