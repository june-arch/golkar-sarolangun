
import React from 'react'

import { CardIdiom } from '@/lib/types';

import NextImage from '../NextImage';

type Props = {
    payload: CardIdiom;
    index: number;
}

const Card = (props: Props) => {
    const { payload, index } = props
    const classPosistion = index % 2 == 0 ? 'pl-6' : 'pr-6';
    const classTitle = index % 2 == 0 ? '' : 'text-right';
    const classMore = index % 2 == 0 ? 'text-left' : 'text-right';
    const classImgPosition = index % 2 == 0 ? false : true;

    return (
        <figure className="flex flex-col sm:flex-row sm:border-4 border-white">
            <div className={`${classImgPosition == false ? 'sm:flex' : 'sm:hidden self-end'}`}>
                <NextImage src={payload.image} alt={`${payload.title}`} className="z-0" width="200" height="200" />
            </div>
            <div className="flex flex-col justify-between basis-3/4 pt-6 p-8">
                <div className={'text-lg font-bold ' + classTitle}>
                    {payload.title}
                </div>
                <p className="text-center text-sm pt-1">{payload.description}</p>
                <figcaption className={classPosistion}>
                    <div className={'pt-6 text-sky-500 dark:text-sky-400 ' + classMore}>
                        Selengkapnya
                    </div>
                </figcaption>
            </div>
            <div className={`${classImgPosition == true ? 'sm:flex' : 'sm:hidden'} hidden`}>
                <NextImage className="z-0" src={payload.image} alt={`${payload.title}`} width="200" height="200" />
            </div>
        </figure>
    )
}

export default Card;
