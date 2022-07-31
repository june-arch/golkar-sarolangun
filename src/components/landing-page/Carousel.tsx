/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const Carousel = ({activity}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    return (
        <>
        <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            pagination={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
        >
            {activity && activity.data?.map((value, i) => {
                return (
                    value.image && value.image.split(',').map((item, j) => {
                        return (
                            <SwiperSlide key={j}>
                                <img src={process.env.DOMAIN_API+'/api/v1?file='+item+'&bucket=images/activity'} className="border-white border-2"/>
                                <p className="title bg-black bg-opacity-50 w-full p-2 text-center">{value.title}</p>
                            </SwiperSlide>
                        )
                    })
                )
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
            className="mySwiper"
        >
            {activity && activity.data?.map((value, i) => {
                return (
                    value.image && value.image.split(',').map((item, j) => {
                        return (
                            <SwiperSlide key={j}>
                                <img src={process.env.DOMAIN_API+'/api/v1?file='+item+'&bucket=images/activity'} className="border-white border-2"/>
                            </SwiperSlide>
                        )
                    })
                )
            })}
        </Swiper>
    </>
    )
}

export default Carousel;