import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useHistory } from 'react-router-dom'
import { setBackDefaultCount, setCategoryTitle } from '../../redux/action'
import { fetchBasketInProduct, setInitialProductId } from '../../redux/setBasketAction'
import { setResetProductTitle, RESET_PRODUCT_TITLE } from '../../redux/setMenuAction'
import { setOptionChoiceName, setOptionChoice } from '../../redux/action'

const Top = ({cateName}) => {
    const navigate = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()

    // 상태구독
    const bestMenuSelectedId = useSelector(state => state.setMenu.bestMenuSelectedId)
    const burgerMenuSelectedId = useSelector(state => state.setMenu.burgerSelectedId)
    const chickenMenuSelectedId = useSelector(state => state.setMenu.chickenSelectedId)
    const drinkSelectedId = useSelector(state => state.setMenu.drinkSelectedId)
    const snackSideSelectedId = useSelector(state => state.setMenu.snackSideSelectedId)
    const productDetailCount = useSelector(state => state.other.productDetailCount)
    const optionChoice = useSelector(state => state.other.optionChoice)
    const detailProdctTotal = useSelector(state => state.other.detailProdctTotal)
    const productTitle = useSelector(state => state.setMenu.productTitle)
    const optionName = useSelector(state => state.other.optionChoiceName)
    const originPrice = useSelector(state => state.setBasket.originProductPrice)
    const categoryTitle = useSelector(state => state.other.categoryTitle)
    const activeIndex = useSelector(state => state.other.activeIndex)
    const initialProductId = useSelector(state => state.setBasket.initialProductId)

    const [productsId, setProductId] = useState(null)
    useEffect(() => {
        setProductId (
            bestMenuSelectedId ||
            burgerMenuSelectedId ||
            chickenMenuSelectedId ||
            drinkSelectedId ||
            snackSideSelectedId
        )
    }, [bestMenuSelectedId, burgerMenuSelectedId, chickenMenuSelectedId, drinkSelectedId, snackSideSelectedId])


    // 상품페이지 이동시, 각 상품마다 옵션상태누적과 상품ID가 잘못 들어가는 오류를 수정하기 위한소스
    const queryStr = new URLSearchParams(location.search);
    const productNumber = queryStr.get('id');
    // 페이지 진입 시 옵션 및 기타 상태 초기화(=변덕부리는 마음을 가정할때)
    useEffect(() => {
        if(location.pathname && productNumber){
            dispatch(setInitialProductId(productNumber))
            // setProductId(productNumber) // 상품ID는 화면주소의 id로 초기화
            dispatch(setOptionChoiceName('')) // 옵션이름초기화
            dispatch(setOptionChoice('')) // 옵션값초기화    
        }
    }, [location.pathname, productNumber, dispatch]);

    const onBack = () => {
        // 상품 상세에서 리스트로 돌아갈 때 상품명 초기화 및 카테고리 제목 설정
        if (location.pathname.includes('/detail/product/')) {
            dispatch({ type: RESET_PRODUCT_TITLE })
            // 카테고리 제목이 없으면 강제로 설정
            if (!categoryTitle && activeIndex !== undefined) {
                const categoryNames = ['추천메뉴', '치킨&세트', '버거&세트', '스낵&사이드', '음료', '주소등록']
                if (activeIndex >= 0 && activeIndex < categoryNames.length) {
                    dispatch(setCategoryTitle(categoryNames[activeIndex]))
                }
            }
        }
        navigate.goBack()        
        dispatch(setBackDefaultCount(1))
    }
    
    const onBasket = () => {
        const basketInProduct = {
            productID: initialProductId === productNumber ?  initialProductId : productsId, // (변덕부리는 마음을 가정할때)
            // productID: productsId !== initialProductID ? productsId : null,
            count:productDetailCount,
            price: detailProdctTotal,
            option: optionChoice,
            title: productTitle,
            optionName: optionName,
            originPrice: originPrice,
            // ...(optionName && optionName.trim() !== '' && {optionName})
        }

        dispatch(fetchBasketInProduct(basketInProduct));
// console.log(`basketInProduct = ${JSON.stringify(basketInProduct)}`);
        alert(`상품이 장바구니에 담겼습니다`)
        navigate.push(`/basket`)
    }
    
    // 카테고리리스트화면인지 확인
    const isCategoryList = location.pathname === `/detail/category/${activeIndex}`
    
    // 카테고리 제목이 없고 카테고리 리스트 화면이라면 강제로 설정
    useEffect(() => {
        if (isCategoryList && !categoryTitle && activeIndex !== undefined) {
            const categoryNames = ['추천메뉴', '치킨&세트', '버거&세트', '스낵&사이드', '음료', '주소등록']
            if (activeIndex >= 0 && activeIndex < categoryNames.length) {
                dispatch(setCategoryTitle(categoryNames[activeIndex]))
            }
        }
    }, [isCategoryList, categoryTitle, activeIndex, dispatch])
    
    // 디버깅을 위한 콘솔 로그
    console.log('Top 컴포넌트 - productTitle:', productTitle)
    console.log('Top 컴포넌트 - categoryTitle:', categoryTitle)
    console.log('Top 컴포넌트 - isCategoryList:', isCategoryList)
    console.log('Top 컴포넌트 - cateName:', cateName)
    console.log('Top 컴포넌트 - location.pathname:', location.pathname)
    
    // 카테고리 리스트 화면이면 카테고리 제목 우선 표시
    let displayTitle
    if (isCategoryList) {
        displayTitle = categoryTitle || cateName
    } else {
        displayTitle = productTitle || cateName
    }

    return (
        <>
            <div className="topBox">
                <h2>{displayTitle}</h2>
                <a href="javascript:void(0)" className="btn_back" onClick={onBack}><span className="blind">뒤로가기</span></a>
                {
                    !isCategoryList && (<a href="javascript:void(0)" className="btn_basket" onClick={onBasket}><span className="blind">장바구니</span></a>)
                }
            </div>
        </>
    )
}

export default Top