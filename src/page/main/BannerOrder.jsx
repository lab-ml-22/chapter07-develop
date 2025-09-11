import React from 'react'

const BannerOrder = () => {
    const onOrderApp = () => {
        alert(`app이 없습니다`)
    }
    return (
        <>
            <div className="bannerOrder">
                <div className="inner">
                    <div className="top">Experience the burger that will make your taste buds sing! Order now</div>
                    <a onClick={onOrderApp} href="javascript:void(0)">APP ORDER</a>
                </div>
            </div>   
        </>
    )
}

export default BannerOrder