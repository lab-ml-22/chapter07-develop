import React, { useEffect, useState } from 'react'
import Top from './Top'
import DeliveryAddress from './DeliveryAddress'
import Banner from './Banner'
import MenuList from './MenuList'
import Info from './Info'
import Review from './Review'
import Footer from '../main/Footer'
import BottomNav from '../main/BottomNav'
import Button from './Button'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Detail = ({onNaviMenu, cateName}) => {
    const [showInfo, setShowInfo] = useState(false) // Info 컴포넌트 표시 여부 상태
    const [showCategoryList, setShowCategoryList] = useState(true) // 카테고리 리스트 표시 여부 상태
    const location = useLocation()
    
    // URL 파라미터에서 상품 ID 가져오기
    const queryStr = new URLSearchParams(location.search);
    const selectedProductId = queryStr.get('id');
    
    // Redux에서도 가져오기 (백업용)
    const reduxProductId = useSelector(state => {
        const menuState = state.setMenu
        return menuState.bestMenuSelectedId || 
               menuState.chickenSelectedId || 
               menuState.burgerSelectedId || 
               menuState.snackSideSelectedId || 
               menuState.drinkSelectedId
    })
    
    // URL 파라미터가 있으면 그것을 사용, 없으면 Redux 상태 사용
    const finalProductId = selectedProductId || reduxProductId
    
    // 디버깅 로그
    console.log('Detail 컴포넌트 - selectedProductId (URL):', selectedProductId)
    console.log('Detail 컴포넌트 - reduxProductId:', reduxProductId)
    console.log('Detail 컴포넌트 - finalProductId:', finalProductId)

    useEffect(() => {
        const initializeState = () => {
            if (location.pathname.startsWith(`/detail/category/`)) {
                // 카테고리 리스트화면인 경우
                setShowInfo(false); // Info 컴포넌트 숨기기
                setShowCategoryList(true); // 카테고리 리스트 표시
            } else {                        
                setShowInfo(true); // Info 컴포넌트 표시
                setShowCategoryList(false); // 카테고리 리스트 숨기기
            }
        }
        initializeState()
    }, [location.pathname])

    return (
        <>
            <Top cateName={cateName}></Top>
            <DeliveryAddress></DeliveryAddress>
            <Banner></Banner>
            <MenuList 
                /**onShowCategoryMenu함수를 props로 보내는거에 대한 해석: onShowCategoryMenu 함수 안에서 
                 * setShowInfo, setShowCategoryList, setTopTitle 함수를 실행한다 */
                onShowCategoryMenu={() => { /**함수를 props로 넘길때, 이렇게 하는 방식도 있다는거 기억*/
                    setShowInfo(false);
                    setShowCategoryList(true);
                    /*setTopTitle()*/
                }} 
                /**setTopTitle()여기서 파라미터를 넘기지 않는다면, 그 상태에서 setTopTitle 함수는 "아무것도 업데이트하지 않고 기본적으로 유지"하는 역할 */
                /**setTopTitle()은 파라미터가 없어도 기본 상태를 유지하거나, props로 전달된 그대로의 로직을 실행하기 때문에 동작하며, 이는 **전역 상태 관리(리듀서)**와는 별도로, 부모 상태 관리용 액션으로 설계 */
                onProductClick={() => { setShowInfo(true); setShowCategoryList(false); /*setTopTitle()*/}}
                showCategoryList={showCategoryList}
            ></MenuList>
            {showInfo && <Info></Info>}
            {showInfo && <Button></Button>}
            {showInfo && finalProductId && <Review productId={finalProductId}></Review>}
            <Footer></Footer>
            <BottomNav onNaviMenu={onNaviMenu}></BottomNav>
        </>
    )
}

export default Detail
