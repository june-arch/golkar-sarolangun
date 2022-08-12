import React from 'react';

import { VideoItem } from '@/helpers/interface/types';

type Props = {
  payload: VideoItem;
};

export default function Video({ payload }: Props) {
  return (
    <div className='py-2'>
      <iframe
        className='h-[180px] w-[350px]'
        src={payload.path}
        title={`youtube ${payload.tag}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
}
