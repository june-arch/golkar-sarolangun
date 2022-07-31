import Image from 'next/image'
import { formatDateHome } from '@/helpers/utils/common'

export default function News({ payload }) {
  return (
    <figure className="overflow-hidden shadow-md">
      <div className="w-full">
        <Image
          src={process.env.DOMAIN_API+'/api/v1?file='+payload.image+'&bucket=images/news'}
          alt="berita-1"
          height="60"
          width="100%"
          layout="responsive"
        />
      </div>
      <div className="flex h-48 flex-col p-4 text-[12px] space-y-1">
        <div className="text-[12px] font-[700]">{payload.title}</div>
        <div className="font-[200] text-secondary">{payload.category} | {formatDateHome(payload.created_date)}</div>
        <p className="line-clamp-4 ">{payload.content}</p>
        <p className="pt-2 text-right underline text-[#1C6A78] underline-offset-2">Selengkapnya</p>
      </div>
    </figure>
  )
}
