import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Top from './Top'
import OrderList from './OrderList'
import { useDispatch, useSelector } from 'react-redux'
import {resetProductDetail} from '../../redux/action'
import { setCategoryTitle } from '../../redux/action'

const Basket = () => {
    const navigate = useHistory()
    const dispatch = useDispatch()

    // 현재 활성화된 카테고리 인덱스 가져오기
    const activeIndex = useSelector(state => state.other.activeIndex)
    const categoryTitle = useSelector(state => state.other.categoryTitle)

    const [showBasket, setShowBasket] = useState(true)
    const onCloseBasket = (param) => {
        setShowBasket(param)
    }

    const goBack = () => {
        navigate.goBack()
        // 상품에 대한 카운트정보와 옵션정보만 초기화 (상품명은 유지)
        dispatch(resetProductDetail())
        // 카테고리 제목이 설정되어 있지 않다면 현재 활성화된 카테고리 제목으로 설정
        if (!categoryTitle && activeIndex !== undefined) {
            const categoryNames = ['추천메뉴', '치킨&세트', '버거&세트', '스낵&사이드', '음료', '주소등록']
            if (activeIndex >= 0 && activeIndex < categoryNames.length) {
                dispatch(setCategoryTitle(categoryNames[activeIndex]))
            }
        }
    }
    return (
        <>
            {
                showBasket === true ?
                <>
                    <Top onHandlerBasket={onCloseBasket}></Top>
                    <OrderList></OrderList>
                </>
                : goBack()
            }
        </>
    )
}

export default Basket