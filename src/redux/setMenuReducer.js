const initialState = {
    bestMenuSelectedId: null, // 선택한 베스트상품의id
    chickenSelectedId: null, // 선택한 치킨상품의id
    burgerSelectedId: null, // 선택한 버거상품의id
    snackSideSelectedId: null, // 선택한 스낵사이드상품의id
    drinkSelectedId: null, // 선택한 음료상품의 id

    selectedBestMenuProduct: null, // 선택한 베스트상품
    selectedChickenMenuProduct: null, // 선택한 치킨상품
    selectedBurgerProduct: null, // 선택한 버거상품
    selectedSnackSideProduct: null, // 선택한 스낵사이드상품
    selectedDrinkProduct: null, // 선택한 음료상품

    productTitle: "" // 세트상품을 포함하여, 상품상세 상단에 나오는 상품타이틀
}

const setMenuReducer  = (state = initialState, action) => {
    switch (action.type) {
        // 선택한 베스트상품의id
        case "SET_SELECTED_BESTMENUID": 
            return {...state, bestMenuSelectedId: action.payload}
        // 선택한 치킨상품의id
        case "SET_SELECTED_CHICKENMENUID":
            return {...state, chickenSelectedId:action.payload}
        // 선택한 버거상품의id
        case "SET_SELECTED_BURGERMENUID":
            return {...state, burgerSelectedId:action.payload}
        // 선택한 스낵사이드의id
        case "SET_SELECTED_SNACKSIDEID":
            return {...state, snackSideSelectedId:action.payload}
        // 선택한 음료의id
        case "SET_SELECTED_DRINKID":
            return {...state, drinkSelectedId:action.payload}
        // 선택한 베스트상품
        case "SET_SELECTED_BESTMENUPRODUCT":
            return {...state, selectedBestMenuProduct:action.payload}
        // 선택한 치킨상품
        case "SET_SELECTED_CHICKENMENUPRODUCT":
            return {...state, selectedChickenMenuProduct:action.payload}
        // 선택한 버거상품
        case "SET_SELECTED_BURGERPRODUCT":
            return {...state, selectedBurgerProduct:action.payload}
        // 선택한 스낵사이드상품
        case "SET_SELECTED_SNACKSIDEPRODUCT":
            return {...state, selectedSnackSideProduct:action.payload}
        // 선택한 음료상품
        case "SET_SELECTED_DRINK": 
            return {...state, selectedDrinkProduct:action.payload}
        // 세트상품을 포함하여, 상품상세 상단에 나오는 상품타이틀
        case "IN_BASKET_PRODUCT_TITLE":
            return {...state, productTitle:action.payload}
        // 상품명이 있는 상태에서 카테고리명을 클릭하면, 계속 상품명이 보여져서 이를 강제초기화하려고
        case "RESET_PRODUCT_TITLE":
            return {...state, productTitle: ''}
        default:
            return state
    }
}

export default setMenuReducer