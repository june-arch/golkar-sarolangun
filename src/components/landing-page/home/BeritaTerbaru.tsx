import { useRouter } from "next/router";
import { useContext } from "react";

import { StateHomePage } from "@/helpers/hooks/use-context";
import { padding, paddingDefault } from "@/pages";

import News from "../News";

const BeritaTerbaru = () => {
    const {news} = useContext(StateHomePage);
    const router = useRouter();
    const handleNewsPage = () => {
        return router.isReady && router.push('/news');
      };
    return (
        <section className={`flex flex-col space-y-8 ${paddingDefault} ${padding}`}>
          <div className='text-2xl sm:text-4xl text-center font-[600] uppercase text-secondary'>
            <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-8'>
              Berita
            </p>{' '}
            terbaru
          </div>
          <div className='w-[310px] flex flex-col space-y-3 lg:flex-row lg:w-full lg:space-y-0 lg:space-x-3'>
            {news.data && news.data.length > 0 && news.data.map((value, i) => <News key={i} payload={value} />)}
          </div>
          <button
            onClick={handleNewsPage}
            className='w-[280px] self-center rounded-md bg-primary px-4 py-2 text-[14px] sm:text-base font-[500] text-white'
          >
            Lihat Lebih Banyak
          </button>
        </section>
    )
}

export default BeritaTerbaru;