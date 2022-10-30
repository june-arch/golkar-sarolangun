import { ChartSquareBarIcon, ClockIcon, UserIcon } from "@heroicons/react/outline";
import Image from "next/image";

import { padding, paddingDefault } from "@/pages";

const ProfilPimpinan = () => {
    return (
        <section className='flex bg-bgSecondary h-[380px] sm:h-[460px]'>
          <div className={`flex justify-between ${paddingDefault} ${padding}`}>
            <div className='flex w-full sm:w-9/12 flex-col space-y-2'>
              <h1 className='text-2xl sm:text-4xl font-[600] leading-none text-primary'>
                <p className='inline font-[900] text-black underline decoration-primary decoration-[7px] underline-offset-8'>
                  Tantowi
                </p>{' '}
                Jauhari{' '}
                <p className='indent-[92px] sm:indent-[136px] text-xs sm:text-base font-[500] text-black '>
                  Ketua DPD Partai Golkar
                </p>{' '}
                <p className='indent-[92px] sm:indent-[136px] text-xs sm:text-base font-[500]'>
                  Kabupaten Sarolangun
                </p>
              </h1>
              <p className='font-400 text-justify text-sm sm:text-base indent-6'>
                Pada tanggal 15 Maret 2020, Tantowi Jauhari terpilih menjadi Ketua
                DPD Partai Golkar Kabupaten Sarolangun dalam Pemilu 2020. Tantowi
                Jauhari didaulat oleh seluruh pemilik Hak Suara untuk menjadi Ketua
                DPD Partai Golkar Kabupaten Sarolangun Periode 2020-2024.
              </p>
              <div className='flex min-w-[180px] max-w-[214px] justify-center'>
                <div className='flex flex-col space-y-2 text-sm sm:text-base'>
                  <div className='flex items-center space-x-2'>
                    <span className='rounded-md bg-primary p-[2px]'>
                      <UserIcon className='h-5 w-5' />
                    </span>
                    <span className='font-[500] underline'>
                      Profile Pimpinan
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='rounded-md bg-primary p-[2px]'>
                      <ClockIcon className='h-5 w-5' />
                    </span>
                    <span className='font-[500] underline'>
                      Visi dan Misi
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='rounded-md bg-primary p-[2px]'>
                      <ChartSquareBarIcon className='h-5 w-5' />
                    </span>
                    <span className='font-[500] underline'>
                      Tugas dan Fungsi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className='sm:w-[230px]'>
                  <Image
                    src='/images/C6.webp'
                    alt='foto-profile'
                    height={475}
                    width={256}
                    className='opacity-90 drop-shadow-xl'
                  />
              </div>
            </div>
          </div>
        </section>
    )
}

export default ProfilPimpinan;