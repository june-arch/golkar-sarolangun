/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Carousel = ({ activity }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        pagination={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {activity.data &&
          activity.data.length > 0 &&
          activity.data?.map((value) => {
            return (
              value.image &&
              value.image.split(',').map((item, j) => {
                return (
                  <SwiperSlide key={j}>
                    <img
                      src={
                        process.env.DOMAIN_API +
                        '/api/v1?file=' +
                        item +
                        '&bucket=images/activity'
                      }
                      className='border-2 border-white'
                    />
                    <p className='title w-full bg-black bg-opacity-50 p-2 text-center'>
                      {value.title}
                    </p>
                  </SwiperSlide>
                );
              })
            );
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {activity &&
          activity.data.length > 0 &&
          activity.data?.map((value) => {
            return (
              value.image &&
              value.image.split(',').map((item, j) => {
                return (
                  <SwiperSlide key={j}>
                    <img
                      src={
                        process.env.DOMAIN_API +
                        '/api/v1?file=' +
                        item +
                        '&bucket=images/activity'
                      }
                      className='border-2 border-white'
                    />
                  </SwiperSlide>
                );
              })
            );
          })}
      </Swiper>
    </>
  );
};

export default Carousel;
