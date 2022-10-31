import { ClockIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NewsSimple({ payload }) {
  const router = useRouter();
  const handleClick = (val) => {
    router.push('/news/' + val['id_news']);
    return;
  };
  const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

  const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  return (
    <figure className='overflow-hidden shadow-md w-full lg:w-[180px] hover:cursor-pointer' onClick={() => handleClick(payload)}>
      <div className='w-full pb-4 relative h-[200px]'>
        <Image
          src={payload.image}
          alt='berita-1'
          sizes='100vw'
          fill
          style={{objectFit: 'cover'}}
          blurDataURL={rgbDataURL(237, 181, 6)}
          placeholder='blur'
        />
      </div>
      <div className='relative flex flex-col space-y-1 px-4 text-[12px] h-[180px]'>
        <div className='text-[12px] sm:text-base font-[700] pt-2'>{payload.title}</div>
        <div className='font-[200] sm:text-sm capitalize text-secondary'>
          {payload.author} | {payload.category_news.name}
        </div>
        <div className='absolute bottom-2'>
            <div className='flex w-full flex-row items-center justify-center py-2'>
                <span>
                <ClockIcon className='h-5 w-5 text-gray-600 mr-1' />
                </span>
                <p>{payload.created_date}</p>
            </div>
        </div>
      </div>
    </figure>
  );
}
