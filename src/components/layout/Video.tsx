import React from 'react'

import { VideoItem } from "@/lib/types"

type Props = {
    payload: VideoItem;
}

export default function Video({ payload }: Props) {
    return (
        <div className='flex flex-col 2xl:w-[60vh] m-2'>
            <iframe className="h-[50vh] w-full" src={payload.path} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}
