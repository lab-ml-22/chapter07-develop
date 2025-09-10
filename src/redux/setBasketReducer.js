const initialState = {
    inBasketProductId: [],
    callProductInfo:[], // 장바구니에 있는 상품부르려고
    productCountPrice: 0,
    originProductPrice: 0,
    eachProductMinus: 0,
    eachProductPlus: 0,
    initialProductId: null
}

const setBasketReducer = (state = initialState, action) => {
    switch (action.type) {
        case "RESET_PRODUCT_ID":
            return { ...state, initialProductId: action.payload};
        case "IN_BASKET_PRODUCT":
// console.log("담은상품의 정보는:", action.payload); 
// console.log(`initialProductId = ${state.initialProductId}`);
// console.log(`inBasketProductId = ${typeof state.inBasketProductId}`);
        if (!Array.isArray(state.inBasketProductId)) {  // 주어진 값이 배열인지 = Array.isArray , 여기if문을 해석하면 !Array.isArray(state.inBasketProductId)
                                                        // state.inBasketProductId가 배열이 아니라면 참(true)
            return {...state, inBasketProductId:[action.payload]} 
        }
        return {
            ...state,
            inBasketProductId: [...state.inBasketProductId, action.payload]
        }
        case "CALL_PRODUCT":
            return {...state, callProductInfo: action.payload}
        case "SET_PRODUCT_COUNT_PRICE":
            return {...state, productCountPrice: action.payload}
        // 상품의 원래가격
        case "SET_ORIGIN_PRODUCT_PRICE":
            return {...state, originProductPrice: action.payload}
        case "EACH_PRODUCT_MINUS":
            return {...state, eachProductMinus: action.payload}
        case "EACH_PRODUCT_PLUS":
            return {...state, eachProductPlus: action.payload}
        case "OUT_BASKET_PRODUCT":
            return  {...state, 
                        callProductInfo: state.callProductInfo.filter(
                            removeProduct => removeProduct.id !== action.payload
                    )}
        default:
            return state
    }
}

export default setBasketReducer