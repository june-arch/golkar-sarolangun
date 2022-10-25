import { useRouter } from "next/router";
import { useContext } from "react";

import { StateHomePage } from "@/helpers/hooks/use-context";
import { padding, paddingDefault } from "@/pages";

import Carousel from "../Carousel";

const GaleriKegiatan = () => {
    const {activity} = useContext(StateHomePage);
    const router = useRouter();
    const handleActivityPage = () => {
        return router.isReady && router.push('/activity');
      };
    return (
        <section className='bg-[#2C4062]'>
          <div className={`flex flex-col items-center space-y-6 ${paddingDefault} ${padding}`}>
            <div className='text-2xl sm:text-4xl font-[600] uppercase text-primary'>
              <p className='inline font-[900] text-white underline decoration-primary decoration-[7px] underline-offset-8'>
                Galeri
              </p>{' '}
              Kegiatan
            </div>
            <Carousel activity={activity} />
            <button
              onClick={handleActivityPage}
              className=' w-[180px] rounded-md bg-primary px-4 py-2 text-[14px] font-[500] text-white'
            >
              Lihat Lebih Banyak
            </button>
          </div>
        </section>
    )
}

export default GaleriKegiatan;