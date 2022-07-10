import React from 'react';

import { CardIdiom } from '@/controller/interface/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  payload: CardIdiom;
  index: number;
};

const Card = (props: Props) => {
  const { payload, index } = props;
  const classPosistion = index % 2 == 0 ? 'pl-6' : 'pr-6';
  const classTitle = index % 2 == 0 ? '' : 'text-right';
  const classMore = index % 2 == 0 ? 'text-left' : 'text-right';
  const classImgPosition = index % 2 == 0 ? false : true;

  return (
    <figure className='flex flex-col border-white sm:flex-row sm:border-4'>
      <div
        className={`${classImgPosition == false ? 'sm:flex' : 'self-end sm:hidden'
          }`}
      >
        <Image
          src={payload.image}
          alt={`${payload.title}`}
          className='z-0'
          width='200'
          height='200'
        />
      </div>
      <div className='flex basis-3/4 flex-col justify-between p-8 pt-6'>
        <div className={'text-lg font-bold ' + classTitle}>{payload.title}</div>
        <p className='pt-1 text-center text-sm'>{payload.description}</p>
        <figcaption className={classPosistion}>
          <div className={'pt-6 text-sky-500 dark:text-sky-400 ' + classMore}>
            <Link href={'/' + payload.href}>
              <a>Selengkapnya</a>
            </Link>
          </div>
        </figcaption>
      </div>
      <div
        className={`${classImgPosition == true ? 'sm:flex' : 'sm:hidden'
          } hidden`}
      >
        <Image
          className='z-0'
          src={payload.image}
          alt={`${payload.title}`}
          width='200'
          height='200'
        />
      </div>
    </figure>
  );
};

export default Card;
