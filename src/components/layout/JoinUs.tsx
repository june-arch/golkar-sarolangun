import Link from 'next/link'
import React from 'react'

import NextImage from '../NextImage';

type Props = {
    description: string;
    'image-kita-satu': string;
}

const JoinUs = (navItem: Props) => {
    return (
        <section className='flex flex-col px-10'>
            <div className='flex flex-row justify-around'>
                <div className="basis-1/2 font-sans">
                    <div className='text-center text-2xl sm:text-3xl lg:text-5xl xl:text-9xl'>
                        <h1>Golkar Sarolangun</h1>
                    </div>
                    <div className="text-center text-xs sm:text-md 2xl:text-2xl sm:font-bold cursor-pointer sm:mt-6">
                        <Link href='#'>
                            <a className=''>
                                <button className="w-96 sm:w-56 lg:w-96 h-14 px-3  text-slate-700 hover:text-black transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-slate-200 shadow-md">
                                    Bergabung Menjadi Anggota
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='basis-1/2'></div>
            </div>
            <div className='flex flex-col self-center mt-8 sm:mt-64 md:mt-80 xl:mt-96 2xl:mt-48'>
                <div className='flex w-72 self-center'>
                    <div className='bg-local w-full'><NextImage src={navItem['image-kita-satu']} alt='kita-satu' height='25' width='100%' layout='responsive' objectFit='contain' className="-z-10" /></div>
                </div>
                <p className='text-center text-xs sm:text-sm w-[35vh] xs:w-[40vh] sm:w-[50vh] mt-5'>
                    {navItem.description}
                </p>
            </div>
        </section>
    )
}

export default JoinUs