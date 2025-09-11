import axios from "axios"
import {v4 as uuid4} from 'uuid'

// API 기본 URL 설정 (환경에 따라 동적 변경)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/api' 
  : 'http://localhost:3001'

// 액션타입정의
export const IN_BASKET_PRODUCT = "IN_BASKET_PRODUCT"
export const RESET_PRODUCT_ID = "RESET_PRODUCT_ID"
export const CALL_PRODUCT = "CALL_PRODUCT"
export const SET_PRODUCT_COUNT_PRICE = "SET_PRODUCT_COUNT_PRICE"
export const SET_ORIGIN_PRODUCT_PRICE = "SET_ORIGIN_PRODUCT_PRICE"
export const EACH_PRODUCT_MINUS = "EACH_PRODUCT_MINUS"
export const EACH_PRODUCT_PLUS = "EACH_PRODUCT_PLUS"
export const RESET_PRODUCT_DETAIL = "RESET_PRODUCT_DETAIL"
export const OUT_BASKET_PRODUCT = "OUT_BASKET_PRODUCT"

// 액션생성자들
export const setBasketInProduct = inBasketProductId => ({ // 장바구니에 상품넣는 상태액션
    type:IN_BASKET_PRODUCT,
    payload:inBasketProductId
})

export const setInitialProductId = (productID) => ({
    type: RESET_PRODUCT_ID,
    payload:productID
})

export const setBasketOutProduct = callProductInfo => ({
    type:OUT_BASKET_PRODUCT,
    payload:callProductInfo
})

export const setBasketCallProduct = callProductInfo => ({ // 장바구니에 상품부르는 액션
    type:CALL_PRODUCT,
    payload: callProductInfo
})

export const setProductCountPrice = productCountPrice => ({ // 장바구니에 있는 상품카운트옵션에 따른 금액상태
    type:SET_PRODUCT_COUNT_PRICE,
    payload: productCountPrice
})

export const setBasketInOriginProductPrice = originProductPrice => ({ // 장바구니에 상품의원가 넣는 상태액션
    type:SET_ORIGIN_PRODUCT_PRICE,
    payload: originProductPrice
})

export const setEachProductMinus = eachProductMinus => ({ // 장바구니에 있는 상품의 카운트감소액션
    type:EACH_PRODUCT_MINUS,
    payload: eachProductMinus
})

export const setEachProductPlus = eachProductPlus => ({ // 장바구니에 있는 상품의 카운트증가액션
    type:EACH_PRODUCT_PLUS,
    payload: eachProductPlus
})

// 장바구니에 상품넣는 비동기액션
// export const fetchBasketInProduct = (inBasketProductId, productDetailCount, detailProdctTotal, optionChoice, productTitle) => {
export const fetchBasketInProduct = (basketInProduct) => { 
    return dispatch => {
        const {productID, count, price, originPrice, title} = basketInProduct // export const fetchBasketInProduct구조분해
        const optionName = basketInProduct.optionName || '';
        const option = basketInProduct.option || '';
        const id = uuid4()

        axios.post(`${API_BASE_URL}/basket`, {
            id,
            productID,
            count,
            originPrice,
            price,
            option,
            title,
            optionName
        })
        .then(response => {
// console.log(`response.data = ${JSON.stringify(response.data)}`);
            dispatch(setBasketInProduct(response.data))
            dispatch(setInitialProductId(null))
        })
        .catch(error => {
            console.error(error)
        })
    }
}

// 장바구니에 상품빼는 비동기액션 -> Request Body로 id를 전달하는방식
export const fetchBasketOutProdut = (callProductInfo) => {
    return dispatch => {
        axios.delete(`${API_BASE_URL}/basket/${callProductInfo}`)
        .then(() => {
            dispatch(setBasketOutProduct(callProductInfo))
        })
        .catch(error => {
            console.error(error)
        })
    }
} 

// 장바구니에 상품부르는 비동기액션
export const fetchBasketCallProduct = () => {
    return dispatch => {
        axios.get(`${API_BASE_URL}/basket`)
            .then(response => {
                dispatch(setBasketCallProduct(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// 장바구니에 있는 상품의 카운트감소 비동기액션
export const fetchEachProductMinus = (id, updateProductData) => {
    return dispatch => {
        axios.put(`${API_BASE_URL}/basket/${id}`, updateProductData)
            .then(response => {
                dispatch(setEachProductMinus(response.data))                
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// 장바구니에 있는 상품의 카운트증가 비동기액션
export const fetchEachProductPlus = (id, updateProductData) => {
    return dispatch => {
        axios.put(`${API_BASE_URL}/basket/${id}`, updateProductData)
            .then(response => {
                dispatch(setEachProductPlus(response.data))
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// 장바구니에 있는 상품카운트옵션 비동기액션
export const fetchProductCountPrice = (id, updateProductPrice) => {
    return dispatch => {
        axios.put(`${API_BASE_URL}/basket/${id}`, updateProductPrice)
            .then(response => {
                dispatch(setProductCountPrice(response.data))
            })
            .catch(error => {
                console.error(error)
            })
    }
}
