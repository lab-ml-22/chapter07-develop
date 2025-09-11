import React, { useState } from 'react'
import LayerInfo3 from '../layer/LayerInfo3'

const DeliveryAddress = () =>{
    // 레이어 열고닫는상태
    const [isLayerOpen, setIsLayerOpen] = useState(false)
    // 레이어종류
    const [acitveLayer, setActiveLayer] = useState(null)
    
    const onAddressFind = () => {
        setIsLayerOpen(true)
        setActiveLayer(`LayerInfo3`)
    }

    // 딤드레이어닫기(자식안에서 닫기행동하지말고, 부모에서 행동하면 부모컴포넌트에 한번만 기입해주면되니까)
    const onLayerClose = () => {
        setIsLayerOpen(false)
        document.body.style.overflowY = 'auto'
    }

    return (
        <>
            <div className="deliveryAddressBox">
                <div className="address">
                    <p>
                        <span>배달을 위해 주소를 검색하셔야 합니다</span>
                        <a href="javascript:void(0)" className="btn_change" onClick={onAddressFind}>변경</a>
                    </p>
                    {
                        isLayerOpen === true && acitveLayer === 'LayerInfo3' ? 
                        <LayerInfo3 isLayerOpen={onAddressFind} isLayerClose={onLayerClose}></LayerInfo3> : null
                    }
                </div>
            </div>  
        </>
    )
}

export default DeliveryAddress
