import axios from 'axios'

// API 기본 URL 설정 (환경에 따라 동적 변경)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/api' 
  : 'http://localhost:3001'

// 액션타입정의
export const SET_SELECTED_BESTMENUID = "SET_SELECTED_BESTMENUID"
export const SET_SELECTED_BESTMENUPRODUCT = "SET_SELECTED_BESTMENUPRODUCT"
export const SET_SELECTED_CHICKENMENUID = "SET_SELECTED_CHICKENMENUID"
export const SET_SELECTED_CHICKENMENUPRODUCT = "SET_SELECTED_CHICKENMENUPRODUCT"
export const SET_SELECTED_BURGERMENUID = "SET_SELECTED_BURGERMENUID"
export const SET_SELECTED_BURGERPRODUCT = "SET_SELECTED_BURGERPRODUCT"
export const IN_BASKET_PRODUCT_TITLE = "IN_BASKET_PRODUCT_TITLE"
export const SET_SELECTED_SNACKSIDEID = "SET_SELECTED_SNACKSIDEID"
export const SET_SELECTED_SNACKSIDEPRODUCT = "SET_SELECTED_SNACKSIDEPRODUCT"
export const SET_SELECTED_DRINKID = "SET_SELECTED_DRINKID"
export const SET_SELECTED_DRINK = "SET_SELECTED_DRINK"
export const SET_CATEGORY_TITLE = "SET_CATEGORY_TITLE"
export const RESET_PRODUCT_TITLE = "RESET_PRODUCT_TITLE"

// 액션생성자들
export const setSelectedBestMenuProductId = bestMenuSelectedId => ({ // 선택한 베스트상품의id
    type: SET_SELECTED_BESTMENUID,
    payload: bestMenuSelectedId
})

export const setSelectedBestMenuProduct = selectedBestMenuProduct => ({ // 선택한 베스트상품
    type: SET_SELECTED_BESTMENUPRODUCT,
    payload: selectedBestMenuProduct
})

export const setSelectedChickenProductId = chickenSelectedId => ({ // 선택한 치킨상품의id
    type: SET_SELECTED_CHICKENMENUID,
    payload: chickenSelectedId
})

export const setSelectedChickenProduct = selectedChickenMenuProduct => ({ // 선택한 치킨상품
    type: SET_SELECTED_CHICKENMENUPRODUCT,
    payload: selectedChickenMenuProduct
})

export const setSelectedBurgerProductId = burgerSelectedId => ({ // 선택한 버거상품의id
    type: SET_SELECTED_BURGERMENUID,
    payload: burgerSelectedId
})

export const setSelectedBurgerProduct = selectedBurgerProduct => ({ // 선택한 버거상품
    type: SET_SELECTED_BURGERPRODUCT,
    payload: selectedBurgerProduct
})

export const setSelectedSnackSideProductId = snackSideSelectedId => ({ // 선택한 스낵사이드의id
    type: SET_SELECTED_SNACKSIDEID,
    payload: snackSideSelectedId
})

export const setSelectedSnackSideProduct = selectedSnackSideProduct => ({ // 선택한 스낵사이드상품
    type: SET_SELECTED_SNACKSIDEPRODUCT,
    payload: selectedSnackSideProduct
})

export const setSelectedDrinkProductId = drinkSelectedId => ({ // 선택한 음료의id
    type:SET_SELECTED_DRINKID,
    payload: drinkSelectedId
})

export const setSelectedDrinkProduct = selectedDrinkProduct => ({ // 선택한 음료
    type:SET_SELECTED_DRINK,
    payload: selectedDrinkProduct
})

export const setBasketInProductTitle = productTitle => ({ // 장바구니에 상품명넣는 상태액션 + 상품상세 상단에 보여지는 타이틀의 상태액션
    type: IN_BASKET_PRODUCT_TITLE,
    payload:productTitle
})

export const setResetProductTitle = (productTitle = "") => ({ // 상단에 상품명 또는 카테고리명을 보여줄때
    // 상품상세에서 카테고리 클릭했을때, 카테고리명을 보여주기 위해 상품명을 강제 초기화
    type:RESET_PRODUCT_TITLE,
    payload: productTitle
})

// 각 카테고리의 초기화 액션을 객체로 정의
const categoryResetActions = {
    bestMenu: [
        setSelectedBurgerProduct,
        setSelectedChickenProduct,
        setSelectedSnackSideProduct,
        setSelectedDrinkProduct
    ],
    chickenSet: [
        setSelectedBestMenuProduct,
        setSelectedBurgerProduct,
        setSelectedSnackSideProduct,
        setSelectedDrinkProduct
    ],
    burgerSet: [
        setSelectedBestMenuProduct,
        setSelectedChickenProduct,
        setSelectedSnackSideProduct,
        setSelectedDrinkProduct
    ],
    snackSideSet: [
        setSelectedBestMenuProduct,
        setSelectedChickenProduct,
        setSelectedBurgerProduct,
        setSelectedDrinkProduct
    ],
    drink: [
        setSelectedBestMenuProduct,
        setSelectedChickenProduct,
        setSelectedBurgerProduct,
        setSelectedSnackSideProduct
    ]
}

// 각 카테고리의 상태초기화 액션
const resetOtherCategories = (dispatch, currentCategory) => {
    const actionToReset = categoryResetActions[currentCategory]

    actionToReset.forEach(element => {
        dispatch(element(null))  
    })
}

// 선택한 베스트메뉴ID의 비동기액션
export const fetchSelectedBestMenuProductId = bestMenuSelectedId => {
    return dispatch => {
        axios.get(`${API_BASE_URL}/bestMenu?id=${bestMenuSelectedId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const resultData = response.data[0]
                    const resultID = resultData.id
                    if(resultData) {
                        // 상태초기화
                        resetOtherCategories(dispatch, 'bestMenu')
                        // 상태업데이트
                        dispatch(setSelectedBestMenuProduct(resultData))
                        dispatch(setSelectedBestMenuProductId(resultID))
                        dispatch(setBasketInProductTitle(resultData.title))
                    }
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
}

// 선택한 치킨세트ID의 비동기액션
export const fetchSelectedChickenProductId = chickenSelectedId => {
    return dispatch => {
        axios.get(`${API_BASE_URL}/chickenSet?id=${chickenSelectedId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const resultData = response.data[0]
                    const resultID = resultData.id
                    if(resultData) {
                        // 상태초기화
                        resetOtherCategories(dispatch, 'chickenSet')
                        // 상태업데이트
                        dispatch(setSelectedChickenProduct(resultData))
                        dispatch(setSelectedChickenProductId(resultID))
                        dispatch(setBasketInProductTitle(resultData.title))
                    }
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
}

// 선택한 버거세트ID의 비동기액션
export const fetchSelectedBurgerProductId = burgerSelectedId => {
    return dispatch => {
        axios.get(`${API_BASE_URL}/burgerSet?id=${burgerSelectedId}`)
            .then(response => {
                if(response.data && response.data.length > 0) {
                    const resultData = response.data[0]
                    const resultID = resultData.id
                    if(resultData) {
                        // 상태초기화
                        resetOtherCategories(dispatch, 'burgerSet')
                        // 상태업데이트
                        dispatch(setSelectedBurgerProduct(resultData))
                        dispatch(setSelectedBurgerProductId(resultID))
                        dispatch(setBasketInProductTitle(resultData.title))
                    }
                }
            })
            .catch(error => 
                console.error(error)
            )
    }
}

// 선택한 스낵사이드세트ID의 비동기액션
export const fetchSelectedSnackSideProductId = snackSideSelectedId => {
    return dispatch => {
        axios.get(`${API_BASE_URL}/snackSideSet?id=${snackSideSelectedId}`)
            .then(response => {
                if(response.data && response.data.length > 0) {
                    const resultData = response.data[0]
                    const resultID = resultData.id
                    if(resultData) {
                        // 상태초기화
                        resetOtherCategories(dispatch, 'snackSideSet')
                        // 상태업데이트
                        dispatch(setSelectedSnackSideProduct(resultData))
                        dispatch(setSelectedSnackSideProductId(resultID))
                        dispatch(setBasketInProductTitle(resultData.title))
                    }
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
}

//  선택한 드링크ID의 비동기액션
export const fetchSelectedDrinkProductId = drinkSelectedId => {
    return dispatch => {
        axios.get(`${API_BASE_URL}/drink?id=${drinkSelectedId}`)
            .then(response => {
                if(response.data && response.data.length > 0) {
                    const resultData = response.data[0]
                    const resultID = resultData.id
                    if(resultData) {
                        // 상태초기화
                        resetOtherCategories(dispatch, 'drink')
                        // 상태업데이트
                        dispatch(setSelectedDrinkProduct(resultData))
                        dispatch(setSelectedDrinkProductId(resultID))
                        dispatch(setBasketInProductTitle(resultData.title))
                    }
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
}