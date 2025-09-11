import {v4 as uuid4} from 'uuid'
import { fetchData } from '../data/mockData'

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
    return async dispatch => {
        try {
            const {productID, count, price, originPrice, title} = basketInProduct
            const optionName = basketInProduct.optionName || '';
            const option = basketInProduct.option || '';
            const id = uuid4()

            // 로컬 스토리지에 장바구니 데이터 저장 (간단한 구현)
            const basketItem = {
                id,
                productID,
                count,
                originPrice,
                price,
                option,
                title,
                optionName
            }
            
            // 기존 장바구니 데이터 가져오기
            const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]')
            existingBasket.push(basketItem)
            localStorage.setItem('basket', JSON.stringify(existingBasket))
            
            dispatch(setBasketInProduct(basketItem))
            dispatch(setInitialProductId(null))
        } catch (error) {
            console.error(error)
        }
    }
}

// 장바구니에 상품빼는 비동기액션 -> Request Body로 id를 전달하는방식
export const fetchBasketOutProdut = (callProductInfo) => {
    return async dispatch => {
        try {
            // 로컬 스토리지에서 해당 상품 제거
            const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]')
            const updatedBasket = existingBasket.filter(item => item.id !== callProductInfo)
            localStorage.setItem('basket', JSON.stringify(updatedBasket))
            
            dispatch(setBasketOutProduct(callProductInfo))
        } catch (error) {
            console.error(error)
        }
    }
} 

// 장바구니에 상품부르는 비동기액션
export const fetchBasketCallProduct = () => {
    return async dispatch => {
        try {
            // 로컬 스토리지에서 장바구니 데이터 가져오기
            const basketData = JSON.parse(localStorage.getItem('basket') || '[]')
            dispatch(setBasketCallProduct(basketData))
        } catch (error) {
            console.log(error)
        }
    }
}

// 장바구니에 있는 상품의 카운트감소 비동기액션
export const fetchEachProductMinus = (id, updateProductData) => {
    return async dispatch => {
        try {
            // 로컬 스토리지에서 해당 상품 수량 감소
            const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]')
            const updatedBasket = existingBasket.map(item => 
                item.id === id ? { ...item, ...updateProductData } : item
            )
            localStorage.setItem('basket', JSON.stringify(updatedBasket))
            
            dispatch(setEachProductMinus(updateProductData))
        } catch (error) {
            console.error(error)
        }
    }
}

// 장바구니에 있는 상품의 카운트증가 비동기액션
export const fetchEachProductPlus = (id, updateProductData) => {
    return async dispatch => {
        try {
            // 로컬 스토리지에서 해당 상품 수량 증가
            const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]')
            const updatedBasket = existingBasket.map(item => 
                item.id === id ? { ...item, ...updateProductData } : item
            )
            localStorage.setItem('basket', JSON.stringify(updatedBasket))
            
            dispatch(setEachProductPlus(updateProductData))
        } catch (error) {
            console.error(error)
        }
    }
}

// 장바구니에 있는 상품카운트옵션 비동기액션
export const fetchProductCountPrice = (id, updateProductPrice) => {
    return async dispatch => {
        try {
            // 로컬 스토리지에서 해당 상품 가격 업데이트
            const existingBasket = JSON.parse(localStorage.getItem('basket') || '[]')
            const updatedBasket = existingBasket.map(item => 
                item.id === id ? { ...item, ...updateProductPrice } : item
            )
            localStorage.setItem('basket', JSON.stringify(updatedBasket))
            
            dispatch(setProductCountPrice(updateProductPrice))
        } catch (error) {
            console.error(error)
        }
    }
}
