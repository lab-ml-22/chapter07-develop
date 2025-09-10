import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {setSelectedBestMenuProductId, setSelectedChickenProductId, setSelectedBurgerProductId,
setSelectedSnackSideProductId, setSelectedDrinkProductId} from '../../redux/setMenuAction'
import { fetchBasketInProduct } from '../../redux/setBasketAction'
import { fetchBestMenu, fetchChicken, fetchBurger, fetchSnackSide, fetchDrink} from '../../redux/action'
import axios from 'axios'

const DetailCategory = ({activeIndex, onProductClick}) => {
    const [resultCategory, setResultCateGory] = useState([])
    const [reviewCounts, setReviewCounts] = useState({})
    const pageNavigate = useHistory()
    const dispatch = useDispatch()

    // 상태구독
    const bestMenu = useSelector(state => state.other.bestMenu);
    const chickenSet = useSelector(state => state.other.chickenSet);
    const burgerSet = useSelector(state => state.other.burgerSet);
    const snackSideSet = useSelector(state => state.other.snackSideSet);
    const drinkSet = useSelector(state => state.other.drink);

    useEffect(() => {
        let cateGubun = [
            { idx: 0, setName: bestMenu },
            { idx: 1, setName: chickenSet },
            { idx: 2, setName: burgerSet },
            { idx: 3, setName: snackSideSet },
            { idx: 4, setName: drinkSet },
        ] 
        let selectCategory = cateGubun.find((value) => value.idx === activeIndex)
        if(selectCategory) {
            setResultCateGory(selectCategory.setName)
        }
    }, [activeIndex, bestMenu, chickenSet, burgerSet, snackSideSet, drinkSet])
// console.log(`resultCategory = ${JSON.stringify(resultCategory)}`);

    useEffect(() => {
        // 필요한 데이터만 비동기로 불러오기
        switch (activeIndex) {
            case 0:
                dispatch(fetchBestMenu());
                break;
            case 1:
                dispatch(fetchChicken());
                break;
            case 2:
                dispatch(fetchBurger());
                break;
            case 3:
                dispatch(fetchSnackSide());
                break;
            case 4:
                dispatch(fetchDrink());
                break;
            default:
                break;
        }
    }, [dispatch, activeIndex]);

    // 리뷰 개수 가져오는 함수
    const fetchReviewCounts = async (products) => {
        const counts = {}
        for (const product of products) {
            try {
                const response = await axios.get(`http://localhost:3001/reviews?productId=${product.id}`)
                counts[product.id] = response.data.length
                console.log(`상품 ${product.id} (${product.title}): 리뷰 ${response.data.length}개`)
            } catch (error) {
                counts[product.id] = 0
                console.error(`상품 ${product.id} 리뷰 조회 실패:`, error)
            }
        }
        setReviewCounts(counts)
    }

    // 상품 목록이 변경될 때마다 리뷰 개수 가져오기
    useEffect(() => {
        if (resultCategory.length > 0) {
            fetchReviewCounts(resultCategory)
        }
    }, [resultCategory])

    const actionMap  = {
        0: setSelectedBestMenuProductId,
        1: setSelectedChickenProductId,
        2: setSelectedBurgerProductId,
        3: setSelectedSnackSideProductId,
        4: setSelectedDrinkProductId
    }

    const onDetailProduct = async(param) => {
        const action = actionMap[activeIndex]
        if(action) {
            await dispatch(action(param))
        }
        // if(activeIndex === 0) {
        //     await dispatch(setSelectedBestMenuProductId(param))
        // } else if(activeIndex === 1) {
        //     await dispatch(setSelectedChickenProductId(param))
        // } else if(activeIndex === 2) {
        //     await dispatch(setSelectedBurgerProductId(param))
        // } else if(activeIndex === 3) {
        //     await dispatch(setSelectedSnackSideProductId(param))
        // } else if(activeIndex === 4) {
        //     await dispatch(setSelectedDrinkProductId(param)) 
        // }
        // navigate
        pageNavigate.push(`/detail?id=${param}`)
        onProductClick()
    }

    const onBasket = (productInfo) => {
// console.log(`productInfo = ${JSON.stringify(productInfo)}`);

        const basketInProduct = {
            productID: productInfo.id, // 베스트메뉴id or 치킨상품id or 버거상품id or 스넥사이드상품id or 음료id
            count: 1,
            price: productInfo.price,
            option: '',
            title: productInfo.title,
            optionName: '',
            originPrice: productInfo.price
        }

        dispatch(fetchBasketInProduct(basketInProduct));
        alert(`상품이 장바구니에 담겼습니다`)
// console.log(`basketInProduct = ${JSON.stringify(basketInProduct)}`);
        pageNavigate.push(`/basket`)
    }

    return (
        <>
            <div className="detailCategoryBox">
                <ul>
                    {
                        Array.isArray(resultCategory) && resultCategory.length > 0 ? (
                            resultCategory.map((value, idx)=> {
                                const formatPrice = (value.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')                       
                                return  <li key={idx}>
                                            <a onClick={() => onDetailProduct(value.id)} href="javascript:void(0)">
                                                <img src={`/images/${value.id}.png`} alt={value.title}/>
                                                <span className="title">{value.title}</span>
                                                <span className="subtext">{value.subText}</span>
                                                <div className="review-info">
                                                    <span className="review-count">리뷰 {reviewCounts[value.id] || 0}개</span>
                                                </div>
                                            </a>
                                            <div className="order">
                                                <a className="btn_basket" onClick={() => onBasket(value)} href="javascript:void(0)"><span className="blind">장바구니</span></a>
                                                <a className="btn_order" href="javascript:void(0)"><span>바로주문</span></a>
                                            </div>
                                            <p className="price"><span>{formatPrice}</span></p>
                                        </li>
                            })
                        ) : (<p>카테고리 데이터가 없습니다다</p>)
                    }
                </ul>
            </div>
        </>
    )
}

export default DetailCategory 
