import React from 'react';

import { VideoItem } from '@/lib/interface/types';

type Props = {
  payload: VideoItem;
};

export default function Video({ payload }: Props) {
  return (
    <div className='m-2 flex-1'>
      <iframe
        className='h-[50vh] w-full md:h-[60vh]'
        src={payload.path}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
}
