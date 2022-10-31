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
                      src={item}
                      className='border-2 border-white w-1/2 mx-auto h-[250px] sm:h-[400px] lg:h-[500px] object-cover'
                    />  
                    <p className='title w-full bg-white bg-opacity-50 p-2 text-center'>
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
                      src={item}
                      className='border-2 border-white  w-full h-[70px] sm:h-[120px] lg:h-[140px] object-cover'
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
