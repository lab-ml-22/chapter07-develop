import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import { fetchBasketInProduct, setInitialProductId } from '../../redux/setBasketAction'
import { setOptionChoiceName, setOptionChoice } from '../../redux/action'

const Button = () => {
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
  const initialProductId = useSelector(state => state.setBasket.initialProductId)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useHistory()

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
  }, [dispatch, location.pathname, productNumber]);

  const onBasket = () => {
    const basketInProduct = {
      // productID: productsId, // 베스트메뉴id or 치킨상품id or 버거상품id or 스넥사이드상품id or 음료id
      productID: initialProductId === productNumber ?  initialProductId : productsId, // (변덕부리는 마음을 가정할때)
      count: productDetailCount,
      price: detailProdctTotal,
      option: optionChoice,
      title: productTitle,
      optionName: optionName,
      originPrice: originPrice
  }

    dispatch(fetchBasketInProduct(basketInProduct));
    alert(`상품이 장바구니에 담겼습니다`)
        navigate.push(`/basket`)
  }

  return (
    <>
      <div className="btnBox">
        <a className="btn_basket" onClick={onBasket} href="javascript:void(0)">장바구니</a>
        <a className="btn_order" href="javascript:void(0)">바로주문</a>
      </div>
    </> 
  )
}

export default Button