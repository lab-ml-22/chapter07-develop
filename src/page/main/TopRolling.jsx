import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import swiper1Img from '../../img/imgTopRolling_1.png'
import swiper2Img from '../../img/imgTopRolling_2.png'
import swiper3Img from '../../img/imgTopRolling_3.png'

const TopRolling = () => {
    return (
        <div style={{width: 'auto', height: 'auto'}}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{delay: 3000, disableOnInteraction: false}}
                modules={[Autoplay]}
                style={{width: '100%', height: '100%'}}
            >
                <SwiperSlide><img src={swiper1Img} alt=""/></SwiperSlide>
                <SwiperSlide><img src={swiper2Img} alt=""/></SwiperSlide>
                <SwiperSlide><img src={swiper3Img} alt=""/></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default TopRolling;
