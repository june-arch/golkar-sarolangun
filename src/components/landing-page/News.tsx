import { ClockIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { formatDate } from '@/helpers/utils/common';

export default function News({ payload }) {
  const router = useRouter();
  const handleClick = (val) => {
    router.push('/news/' + val['id_news']);
    return;
  };
  return (
    <figure className='overflow-hidden shadow-md'>
      <div className='w-full pb-4'>
        <Image
          src={
            process.env.DOMAIN_API +
            '/api/v1?file=' +
            payload.image +
            '&bucket=images/news'
          }
          alt='berita-1'
          height='60'
          width='100%'
          layout='responsive'
        />
      </div>
      <div className='relative h-[200px] space-y-1 px-4 text-[12px]'>
        <div className='text-[12px] font-[700]'>{payload.title}</div>
        <div className='font-[200] capitalize text-secondary'>
          {payload.author} | {payload.category}
        </div>
        <p
          className='text-justify line-clamp-4'
          dangerouslySetInnerHTML={{ __html: payload.content }}
        ></p>
        <div className='absolute left-0 bottom-2 flex w-full flex-row items-center justify-between px-4 py-2'>
          <div className='flex flex-row items-center space-x-1'>
            <span>
              <ClockIcon className='h-7 w-7 text-gray-600' />
            </span>
            <p>{formatDate(payload.created_date).replace('at', '|')}</p>
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
