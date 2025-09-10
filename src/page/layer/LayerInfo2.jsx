import React, { useEffect } from 'react'
import layerImg2 from '../../img/info_allergy.jpg'

const LayerInfo2 = ({isLayerOpen, isLayerClose}) => {
    useEffect(() => {
        if(isLayerOpen) {
            document.body.style.overflowY = 'hidden'
        }
    },[isLayerOpen])

    if(!isLayerOpen) {
        return null // false일때 컴포넌트 렌더링 하지 않기 위한 조건
    }
    return (
        <>{}
            <div className="layoutBox">
                <div className="inner">
                    <div className="panel">
                        <button onClick={isLayerClose}>닫기</button>
                        <img src={layerImg2} alt=""/>                 
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayerInfo2
