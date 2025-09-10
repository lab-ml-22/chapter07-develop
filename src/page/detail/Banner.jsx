import React from 'react'
import bannerSubBG from '../../img/banner_sub_bg.jpg'

const Banner = () => {
    return (
        <>
            <div className="deliveryBannerBox">
                <div className="bannerContetns">
                    <div className="bannerDesc">
                        <p>다양한 메뉴를 배달로 만나세요!</p>
                        <h3>DELIVERY<br/>MENU</h3>
                    </div>
                    <img src={bannerSubBG} alt=""/>
                </div> 
            </div>            
        </>
    )
}

export default Banner