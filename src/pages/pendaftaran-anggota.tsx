import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

import { contentOne } from '@/helpers/resource/nav-data'
import { NavItem } from '@/helpers/interface/types'

import Footer from '@/components/landing-page/Footer'
import Layout from '@/components/landing-page/Layout'
import Navbar from '@/components/landing-page/Navbar'
import Image from 'next/image'
import { CheckIcon, ViewListIcon } from '@heroicons/react/outline'
import Bookmark from '@/components/icon/bookmark'
import BookmarkNoto from '@/components/icon/bookmarknoto'

type Props = {
  navItem: NavItem
}

const PendaftaranAnggota = ({ navItem }: Props) => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main className="bg-[#F9F9F9]">
        <div className="sticky top-0 z-50 bg-primary">
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className="mx-auto flex flex-col p-8 space-y-6">
          <div className="flex flex-col space-y-2 bg-[#EEEEEE] border-l-8 border-l-primary px-6 py-4">
            <span className="w-16 h-16">
              <Bookmark />
            </span>
            <div className="font-[700] text-[15px]">Persyaratan Menjadi Anggota</div>
            <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <span className="bg-primary p-[2px] rounded-full"><CheckIcon className="h-5 w-5 text-white"/></span>
                  <span className="font-[500] text-xs">Bertempat tinggal di Jambi</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="bg-primary p-[2px] rounded-full"><CheckIcon className="h-5 w-5 text-white"/></span>
                  <span className="font-[500] text-xs">Mempunyai KTP provinsi Jambi</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="bg-primary p-[2px] rounded-full"><CheckIcon className="h-5 w-5 text-white"/></span>
                  <span className="font-[500] text-xs">Mampu berkomunikasi dengan baik</span>
                </div>       
              </div>
          </div>
          <div className="flex flex-col space-y-2 bg-[#EEEEEE] border-l-8 border-l-green-500 px-6 py-4">
            <span className="w-16 h-16">
              <BookmarkNoto />
            </span>
            <div className="font-[700] text-[15px]">Manfaat Menjadi Anggota</div>
            <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <span className="bg-green-500 p-[2px] rounded-full"><CheckIcon className="h-5 w-5 text-white"/></span>
                  <span className="font-[500] text-xs">Ikut webinar gratis pengembangan potensi</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="bg-green-500 p-[2px] rounded-full"><CheckIcon className="h-5 w-5 text-white"/></span>
                  <span className="font-[500] text-xs">Pelatihan eksklusif pengembangan usaha</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="bg-green-500 p-[2px] rounded-full"><CheckIcon className="h-5 w-5 text-white"/></span>
                  <span className="font-[500] text-xs">Ikut kegiatan produktif & eksklusif</span>
                </div>       
              </div>
          </div>
          <div className="flex flex-col space-y-2 bg-[#EEEEEE] border-[#EEEEEE] border-2 rounded-md shadow-sm">
            <div className="flex flex-col text-center p-2">
              <div className="font-[700] text-[24px] text-primary">Pendaftaran</div>
              <div className="text-black text-[15px] font-[700]">Kartu Tanda Anggota Online</div>
            </div>
            <form className="flex flex-col space-y-4 pb-4">
              <div className="bg-white flex flex-col space-y-2 py-4 px-6">
                <label className="text-[12px] font-[400]">Nomor NIK/KTP (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Contoh: 1503091306960001"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Nama Lengkap (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Contoh: Muhammad Budianto"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Tempat Lahir (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Contoh: Muara Bungo"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Tanggal Lahir (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="dd / mm / yyy"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Jenis Kelamin (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Pilih Jenis  ..."
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Email (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Contoh: budi@gmail.com"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Nomor Telepon (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Pilih Jenis  ..."
                  aria-label="Contoh: 0821********"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Alamat (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Contoh: Jalan Apel Limau No. 32"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Status Pendidikan (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Pilih Pendidikan Terakhir"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Kecamatan (*)</label>
                <input
                  type="text"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Pilih Kecamatan"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <label className="text-[12px] font-[400]">Foto Wajah (*)</label>
                <input
                  type="file"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Pilih Kecamatan"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <p className="text-[11px]">Maksimal ukuran file 200kb dan format file JPEG</p>
                <label className="text-[12px] font-[400]">Foto KTP (*)</label>
                <input
                  type="file"
                  className="form-control m-0 block w-full h-[34px] min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Pilih Kecamatan"
                  aria-label="Cari Nomor KTP"
                  aria-describedby="button-addon2"
                />
                <p className="text-[11px]">Maksimal ukuran file 200kb dan format file JPEG</p>
                <p className="text-[11px]">Anda Wajib Mengisi Form yang Bertanda (*)</p>
              </div>
              <button className="bg-primary self-center text-white px-6 py-2 rounded-md"> Daftar </button>
            </form>
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

export default PendaftaranAnggota
