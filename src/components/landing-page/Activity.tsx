import { ClockIcon, VideoCameraIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { dayOfWeekAsString, formatDate } from '@/helpers/utils/common';

export default function Activity({ payload }) {
  const router = useRouter();
  const handleClick = (val) => {
    router.push('/activity/' + val['id_activity']);
    return;
  };
  return (
    <figure className='overflow-hidden shadow-md'>
      <div className='w-full pb-4'>
        <Image
          src={payload.image}
          alt='activity-1'
          height='60'
          width='100'
        />
      </div>
      <div className='relative h-[100px] space-y-1 px-4 text-[12px]'>
        <div className='text-[14px] font-[500]'>{payload.title}</div>
        <div className='flex items-center space-x-2 text-[12px] font-[200] capitalize text-secondary'>
          <p>{payload.category}</p>
          <div className='flex flex-row items-center space-x-1'>
            <span>
              <ClockIcon className='h-4 w-4 text-gray-600' />
            </span>
            <p>
              {dayOfWeekAsString(new Date(payload.created_date).getDay())},{' '}
              {formatDate(payload.created_date).replace('at', '|')}
            </p>
          </div>
        </div>
        <div className='absolute left-0 bottom-2 flex w-full flex-row items-center justify-between px-4 py-2'>
          {payload.video ? (
            <Link href={payload.video}>
              <button className='flex flex-row items-center rounded-md bg-primary p-2'>
                <span className='mr-1'>
                  <VideoCameraIcon className='h-4 w-4 text-gray-900' />
                </span>
                Video Kegiatan
              </button>
            </Link>
          ) : (
            <div></div>
          )}
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
