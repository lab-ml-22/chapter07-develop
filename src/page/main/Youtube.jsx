import React from 'react'
// import sprite from '../../img/sprite.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Youtube = () => {
    return (
        <>
            <div className="youtubeBox">
                <div className="title">
                    {/* <img src={sprite} alt=""/> */}
                    <h2>BURGER YOUTUBE</h2>
                </div>
                <div className="item" style={{width: 'auto', height: 'auto'}}>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1.2}
                        style={{width: '100%', height: '100%'}}
                    >
                        <SwiperSlide><a href="https://www.youtube.com/embed/egVAK6ot9zk?si=KXzKGksS6vr5Hp7t" target="_blank" rel="noopener noreferrer"><iframe width="100%" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/egVAK6ot9zk?si=KXzKGksS6vr5Hp7t"></iframe></a></SwiperSlide>
                        <SwiperSlide><a href="https://www.youtube.com/embed/5pDjdn_ZSoQ?si=MpGVOusIwPdsDzbo" target="_blank" rel="noopener noreferrer"><iframe width="100%" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/5pDjdn_ZSoQ?si=MpGVOusIwPdsDzbo"></iframe></a></SwiperSlide>
                        <SwiperSlide><a href="https://www.youtube.com/embed/R1TKxS3kh7w?si=_nqBASPaR4kwj8iP" target="_blank" rel="noopener noreferrer"><iframe width="100%" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/R1TKxS3kh7w?si=_nqBASPaR4kwj8iP"></iframe></a></SwiperSlide>
                        <SwiperSlide><a href="https://www.youtube.com/embed/ZcelGbMsd-c?si=IKoIId_Qy_Tde4lz" target="_blank" rel="noopener noreferrer"><iframe width="100%" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/ZcelGbMsd-c?si=IKoIId_Qy_Tde4lz"></iframe></a></SwiperSlide>
                        <SwiperSlide><a href="https://www.youtube.com/embed/tn1gFYIS1MI?si=6wg_FPqN7UCjV3-a" target="_blank" rel="noopener noreferrer"><iframe width="100%" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/tn1gFYIS1MI?si=6wg_FPqN7UCjV3-a"></iframe></a></SwiperSlide>
                        <SwiperSlide><a href="https://www.youtube.com/embed/AnGiIKiCKRM?si=3aw7OSPgCc8o5fIX" target="_blank" rel="noopener noreferrer"><iframe width="100%" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/AnGiIKiCKRM?si=3aw7OSPgCc8o5fIX"></iframe></a></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default Youtube