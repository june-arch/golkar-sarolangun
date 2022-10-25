import { padding, paddingDefault } from "@/pages";

const SejarahPartaiGolkar = () => {
    return (
        <section className={`z-10 ${paddingDefault} ${padding}`}>
          <h1 className='text-2xl sm:text-4xl text-secondary'>
            <p className='inline font-[900] text-black underline decoration-primary decoration-[7px] underline-offset-8'>
              Sejarah
            </p>{' '}
            Partai Golkar
          </h1>
          <div className='pt-3 pb-2 text-justify text-xs sm:text-base font-[400] indent-8 whitespace-normal'>
            <p>
            Golongan Karya (Golkar) muncul dari kolaborasi gagasan tiga tokoh, Soekarno, 
            Soepomo, dan Ki Hadjar Dewantara. Ketiganya, mengajukan gagasan integralistik-kolektivitis sejak 1940. 
            Saat itu, gagasan tiga tokoh ini mewujud dengan adanya Golongan Fungsional. Dari nama ini, 
            kemudian diubah dalam bahasa Sansekerta sehingga menjadi Golongan Karya pada 1959. Hingga kini, 
            Golongan Karya dikenal dalam dunia politik nasional sebagai Golkar.  
            </p>
            <p>
            Pada dekade 1950-an, pembentukan Golongan Karya semula diorientasikan sebagai perwakilan dari 
            golongan-golongan di tegah masyarakat. Perwakilan ini diharapkan bisa merepresentasikan keterwakilan 
            kolektif sebagai bentuk ‘demokrasi’ yang khas Indonesia. Wujud ‘demokrasi’ inilah yang kerap disuarakan 
            Bung Karno, Prof Soepomo, maupun Ki Hadjar Dewantara.
            </p>
          </div>
          <div className='text-[12px] sm:text-lg text-[#1C6A78] underline underline-offset-2'>
            Baca Selengkapnya
          </div>
        </section>
    )
}

export default SejarahPartaiGolkar;