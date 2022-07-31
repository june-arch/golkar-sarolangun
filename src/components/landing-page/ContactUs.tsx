import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'
import { RiWhatsappFill } from 'react-icons/ri'

const ContactUs = () => {
  const Maps = dynamic(() => import('@/components/landing-page/Maps'))
  return (
    <section className="flex flex-col space-y-8 w-full p-8 bg-[#F9F9F9]">
      <h1 className="text-center uppercase text-secondary font-[600]"><p className="inline text-black underline-offset-4 underline decoration-[7px] decoration-secondary font-[900]">Hubungi</p> Kami</h1>
      <div id="map" className="">
        <Maps />
      </div>
    </section>
  )
}

export default ContactUs
