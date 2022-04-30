import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Whatsapp from '~/svg/whatsapp.svg'

const ContactUs = () => {
    const Maps = dynamic(() => import('@/components/layout/Maps'))
    return (
        <section className='flex flex-col 2xl:px-20 py-10'>
            <div className='text-center text-2xl sm:text-3xl md:text4xl lg:text-5xl'>
                <div className='mb-10'>Hubungi Kami</div>
            </div>
            <div id="map" className=''>
                <Maps />
            </div>
            <div className='lg:mt-10 mt-2 p-4 w-full'>
                <Link href="https://wa.me/6281379693637?text=Hello+Saya+ingin+bertanya+%3F">
                    <a target="_blank" rel="noopener noreferrer" className='cursor-pointer flex flex-row rounded-full w-[20vh] md:w-[30vh] lg:w-[47vh] text-slate-700 hover:text-black transition-colors duration-150 bg-white focus:shadow-outline hover:bg-slate-200 shadow-md'>
                        <div className='h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24'><Whatsapp className='w-14 h-14' /></div>
                        <div className='ml-4 text-sm sm:text-md md:text-2xl lg:text-4xl self-center'>
                            081379693637
                        </div>
                    </a>
                </Link>
            </div>
        </section>
    )
}

export default ContactUs