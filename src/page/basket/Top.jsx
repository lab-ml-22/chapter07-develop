import React from 'react'

const Top = ({onHandlerBasket}) => {
    return (
        <>
        <div className="basketTopBox">
            <p>ORDER LIST</p>
            <button onClick={() => onHandlerBasket(false)}>닫기버튼</button>
        </div>
        </>
    )
}

export default Top
