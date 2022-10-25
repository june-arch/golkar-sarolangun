import { RiFacebookCircleLine } from "react-icons/ri";

const MediaSosial = () => {
    return (
        <section className='flex flex-col items-center space-y-6 p-8'>
          <h1 className='font-[600] uppercase text-secondary'>
            <p className='inline font-[900] text-black underline decoration-secondary decoration-[7px] underline-offset-8'>
              Media
            </p>{' '}
            Sosial
          </h1>
          <div className='flex w-full flex-col items-center bg-[#3B5998]'>
            <div className='flex items-center space-x-2 p-2 text-white'>
              <span>
                <RiFacebookCircleLine className='h-7 w-7' />
              </span>
              <span className='text-[18px]'>facebook</span>
            </div>
            <iframe
              src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Ffacebook.com%2Fmpogolkarsarolangun&tabs=timeline&width=350&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
              width='350'
              height='500'
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling='no'
              frameBorder={0}
              allowFullScreen={true}
              allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
            ></iframe>
          </div>
        </section>
    );
}

export default MediaSosial;