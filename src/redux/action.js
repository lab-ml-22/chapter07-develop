import axios from 'axios'

// API 기본 URL 설정 (환경에 따라 동적 변경)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app/api' 
  : 'http://localhost:3001'

// 선택한 카테고리명의 상태액션
export const setCategoryTitle = (categoryTitle) => ({
    type: "SET_CATEGORY_TITLE",
    payload: categoryTitle
})

// 선택한 카테고리 메뉴 이름
export const setUpdateCategory = (index) => {
    const categoryNames = ['추천메뉴', '치킨&세트', '버거&세트', '스낵&사이드', '음료', '주소등록']

    return (dispatch) => {
        if(index >= 0 && index < categoryNames.length) {
            dispatch(setCategoryTitle(categoryNames[index]))
        }
    }
}

// 선택한 카테고리명의 인덱스액션
export const setActiveIndex = (activeIndex) => ({
    type: "SET_ACTIVE_INDEX",
    payload: activeIndex
})

// 베스트메뉴의 상태액션
export const setBestMenu = (bestMenu) => ({
    type: "SET_BEST_MENU",
    payload: bestMenu
})

// 베스트메뉴의 비동기액션
export const fetchBestMenu = () => {
    return (dispatch) => {
        axios.get(`${API_BASE_URL}/bestMenu`)
            .then((response) => {
                // console.log(`베스트메뉴의response = ${JSON.stringify(response.data)}`);
                dispatch(setBestMenu(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// 치킨세트의 상태액션
export const setChichenSet = (chickenSet) => ({
    type:"SET_CHICKEN",
    payload: chickenSet
})

// 치킨세트의 비동기액션
export const fetchChicken = () => {
    return (dispatch) => {
        axios.get(`${API_BASE_URL}/chickenSet`)
            .then((response) => {
// console.log(`치킨세트의response.data = ${JSON.stringify(response.data)}`);
                dispatch(setChichenSet(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// 버거세트의 상태액션
export const setBurgerSet = (burgerSet) => ({
    type: "SET_BURGER",
    payload: burgerSet
})

// 버거세트의 비동기액션
export const fetchBurger = () => {
    return (dispatch) => {
        axios.get(`${API_BASE_URL}/burgerSet`)
            .then((response) => {
// console.log(`버거세트의response.data = ${JSON.stringify(response.data)}`);
                dispatch(setBurgerSet(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// 스낵사이드의 상태액션
export const setSnackSideSet = (snackSideSet) => ({
    type:"SET_SNACK_SIDE",
    payload: snackSideSet
})

// 스낵사이드의 비동기액션
export const fetchSnackSide = () => {
    return (dispatch) => {
        axios.get(`${API_BASE_URL}/snackSideSet`)
            .then((response) => {
                dispatch(setSnackSideSet(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// 음료의 상태액션
export const setDrink = (drink) => ({
    type:"SET_DRINK",
    payload: drink
})

// 음료의 비동기액션
export const fetchDrink = () => {
    return (dispatch) => {
        axios.get(`${API_BASE_URL}/drink`)
            .then((response) => {
// console.log(`음료세트의response.data = ${JSON.stringify(response.data)}`);
                dispatch(setDrink(response.data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

// 로딩액션
export const setLoading = () => ({
    type: "SET_LOADING"
})

// sns의 상태액션
export const setSNSList = (snsList) => ({
    type: "SET_SNS",
    payload: snsList
})

// sns의 비동기액션
export const fetchSNSList = () => {
    return (dispatch) => {
        axios.get(`${API_BASE_URL}/sns`)
            .then((response) => {
                // console.log(`response.data = ${JSON.stringify(response.data)}`);      
                dispatch(setSNSList(response.data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

// 상품페이지에서의 카운트증가액션
export const setProductCountPlus = (productPlusCount) => ({
    type: "SET_PRODUCT_COUNT_PLUS",
    payload: productPlusCount
})

// 상품페이지에서의 카운트감소액션
export const setProductCountMinus = (productMinusCount) => ({
    type: "SET_PRODUCT_COUNT_MINUS",
    payload: productMinusCount
})

// 상품페이지에서의 선택한상품 하위에 있는 옵션의가격액션
export const setOptionChoice = (optionChoice) => ({
    type: "SET_OPTION_CHOICE",
    payload: optionChoice
})

// 상품페이지에서의 선택한상품 하위에 있는 옵션의이름액션
export const setOptionChoiceName = (optionChoiceName) => ({
    type: "SET_OPTION_CHOICE_NAME",
    payload: optionChoiceName
})

// 뒤로가기 버튼 클릭시 카운트옵션1로초기화액션
export const setBackDefaultCount = (productDetailCount) => ({
    type:"SET_DEFAULT_COUNT",
    payload: productDetailCount,
})

// 상품페이지에서 상품의합계
export const setDetailProductTotal = (detailProdctTotal) => ({
    type:"SET_PRODUCT_DETAIL_TOTAL",
    payload:detailProdctTotal
})

// 검색한 주소의 상태액션
export const setSearchAddress = (searchAddress) => ({ // 여기서는, 데이터를 상태에 저장하기위해서 파라미터searchAddress가 필요한거임
    type:"SET_SEARCH_ADDRESS",
    payload: searchAddress
})

// 장바구니에서 '닫기'버튼 클릭시 상품의정보(옵션, 카운트갯수)초기화 액션
export const resetProductDetail = (productDetailCount) => ({ 
    type:"RESET_PRODUCT_DETAIL",
    payload: productDetailCount
})

export const setLayerState = (isOpen, layer) => ({
    type:"SET_LAYER_STATE",
    payload: {isOpen, layer}
})
