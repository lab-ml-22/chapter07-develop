import { combineReducers } from 'redux';
import setMenuReducer from './setMenuReducer'
import setBasketReducer from './setBasketReducer'
import reviewReducer from './reviewReducer'

const initialState = { // state의 초기값을 정의하는 객체
    bestMenu: [], // 처음에 빈배열로 세팅을 해줌(이게 정답은 아니고)
    loading: false,
    snsList: [],
    productDetailCount:1,
    optionChoice:0,
    chickenSet: [],
    burgerSet: [],
    snackSideSet: [],
    drink: [],
    detailProdctTotal: 0,
    searchAddress:[],
    optionChoiceName: "",
    categoryTitle: "",
    activeIndex: null,
    isLayerOpen: false,
    activeLayer: null
}

const otherReducers  = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BEST_MENU":
            return {...state, bestMenu: action.payload} // type은 액션의종류, payload는 액션과같이 전달되어야할 데이터   
        case "SET_LOADING":
            return {...state, loading: true}
        case "SET_SNS":
            return {...state, snsList: action.payload}
        case "SET_PRODUCT_COUNT_PLUS":
            return {...state, productDetailCount: action.payload}
        case "SET_PRODUCT_COUNT_MINUS":
            return {...state, productDetailCount: action.payload}
        // 선택한상품의 하위에 있는 옵션의값
        case "SET_OPTION_CHOICE": 
            return {...state, optionChoice:action.payload}
        // 선택한상품의 하위에 있는 옵션의이름
        case "SET_OPTION_CHOICE_NAME":
// console.log("옵션 이름 초기화:", action.payload); 
            return {...state, optionChoiceName:action.payload}
        case "SET_CHICKEN":
            return {...state, chickenSet: action.payload}
        case "SET_BURGER":
            return {...state, burgerSet: action.payload}
        case "SET_SNACK_SIDE":
            return {...state, snackSideSet: action.payload}
        case "SET_DRINK":
            return {...state, drink: action.payload}
        // 뒤로가기버튼클릭했을때
        case "SET_DEFAULT_COUNT":
            return {...state,
                productDetailCount: 1,
                optionChoice: 0
            }
        case "SET_PRODUCT_DETAIL_TOTAL":
            return {...state, detailProdctTotal:action.payload}
        case "SET_SEARCH_ADDRESS":
            return {...state, searchAddress:action.payload}
        // 장바구니화면에서 닫기버튼 클릭했을때
        case "RESET_PRODUCT_DETAIL":
            return {...state,
                productDetailCount: 1,
                optionChoice: 0
            }
        // 선택한 카테고리의 이름
        case "SET_CATEGORY_TITLE":
            return {...state, categoryTitle: action.payload}
        // 선택한 카테고리의 인덱스
        case "SET_ACTIVE_INDEX":
            return {...state, activeIndex: action.payload}
        case "SET_LAYER_STATE":
            return {
                ...state,
                isLayerOpen: action.payload.isOpen,
                activeLayer: action.payload.layer
            }
        default:
            return state
    }
}

const rootReducer = combineReducers ({
    other: otherReducers,
    setMenu: setMenuReducer,
    setBasket: setBasketReducer,
    review: reviewReducer,
})

export default rootReducer