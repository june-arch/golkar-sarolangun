import { ClockIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function News({ payload }) {
  const router = useRouter();
  const handleClick = (val) => {
    router.push('/news/' + val['id_news']);
    return;
  };
  return (
    <figure className='overflow-hidden shadow-md lg:w-[322px] lg:h-[600px]'>
      <div className='w-full pb-4'>
        <Image
          src={payload.image}
          alt='berita-1'
          height='60'
          width='100%'
          layout='responsive'
        />
      </div>
      <div className='relative h-[300px] lg:h-[400px] space-y-1 px-4 text-[12px]'>
        <div className='text-[12px] sm:text-base font-[700]'>{payload.title}</div>
        <div className='font-[200] sm:text-sm capitalize text-secondary'>
          {payload.author} | {payload.category_news.name}
        </div>
        <div className='text-justify line-clamp-4 text-sm'>{payload.parseContent}</div>
        <div className='absolute text-sm left-0 bottom-2 flex w-full flex-row items-center justify-between px-4 py-2'>
          <div className='flex items-center space-x-1 '>
            <span>
              <ClockIcon className='h-5 w-5 text-gray-600' />
            </span>
            <p>{payload.created_date}</p>
          </div>
          <p
            onClick={() => handleClick(payload)}
            className='cursor-pointer text-[#1C6A78] underline underline-offset-4 hover:text-blue-700'
          >
            Selengkapnya
          </p>
        </div>
      </div>
    </figure>
  );
}
