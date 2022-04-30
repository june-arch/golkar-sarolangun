import dynamic from "next/dynamic";

import { NewsItem } from "@/lib/types";

import NextImage from "../NextImage";

type Props = {
  payload: NewsItem;
}

export default function News({ payload }: Props) {
  const date = new Date(payload.createdAt);
  const LastSeen = dynamic(() => import('./Lastseen'))
  return (
    <figure className='overflow-hidden shadow-lg rounded-xl drop-shadow-lg'>
      <div className="w-full">
        <NextImage src={payload.image} alt='berita-1' height='60' width='100%' layout="responsive" className='rounded-t-xl' />
      </div>
      <div className='flex flex-col p-4 h-44'>
        <div className='text-lg'>{payload.title}</div>
        <p className='text-sm line-clamp-4 '>{payload.description}</p>
        <p className="pt-2 text-right">Selengkapnya</p>
      </div>
      <div className='flex justify-between p-4'>
        {/* <p className="grid">{payload.tags.map((value) => '#' + value)}</p> */}
        <div className="p-0">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fall</span>
        </div>
        <div className='flex flex-col text-right'>
          <div className='text-sm'>{payload.author}</div>
          <div className='text-sm'><LastSeen date={date} /></div>
        </div>
      </div>
    </figure>
  )
}
