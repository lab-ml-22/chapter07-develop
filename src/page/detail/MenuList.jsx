import React, { useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import icon1 from '../../img/dv_mn_new.png'
import icon2 from '../../img/dv_mn_set_chicken.png'
import icon3 from '../../img/dv_mn_set_burger.png'
import icon4 from '../../img/dv_mn_side_menu.png'
import icon5 from '../../img/dv_mn_drink.png'
import icon6 from '../../img/db_mn_address.png'
import { useDispatch, useSelector } from 'react-redux'
import DetailCategory from './DetailCategory'
import { useHistory } from 'react-router-dom'
import { setUpdateCategory, setActiveIndex, setCategoryTitle } from '../../redux/action'
import { setResetProductTitle } from '../../redux/setMenuAction'
import LayerInfo3 from '../layer/LayerInfo3'

const MenuList = ({onShowCategoryMenu, onProductClick, showCategoryList}) => {
    // 상태구독
    const activeIndex = useSelector(state => state.other.activeIndex)

    const dispatch = useDispatch()
    const navigate = useHistory()

    const [isLayerOpen, setIsLayerOpen] = useState(false)
    const [activeLayer, setActiveLayer] = useState(null)

    const onSelectDetailMenu = (indexNumber, cateName) => {
        if(indexNumber !== activeIndex){ // 이전상태랑비교
            dispatch(setActiveIndex(indexNumber)) // 리덕스 상태 업데이트(카테고리인덱스)
            dispatch(setUpdateCategory(indexNumber)) // 리덕스 상태 업데이트(카테고리명)
            dispatch(setResetProductTitle(indexNumber)) // 리덕스 상태 업데이트(상품명 초기화)
            onShowCategoryMenu() // 메뉴클릭시 호출     
            dispatch(setCategoryTitle(cateName))
            navigate.push(`/detail/category/${indexNumber}`) // url변경 
            if(indexNumber === 5) { // 5번이면 '주소등록' 딤드레이어팝업을 보여줌
                setIsLayerOpen(true)
                setActiveLayer('LayerInfo3')
            }
        } else { // 상품상세에서 다시 카테고리 클릭하면, 클릭한 카테고리명 리스트들 보여주기
            dispatch(setResetProductTitle(indexNumber)) 
            if(indexNumber === 5) { // 5번이면 '주소등록' 딤드레이어팝업을 보여줌
                setIsLayerOpen(true)
                setActiveLayer('LayerInfo3')
            }
            navigate.push(`/detail/category/${indexNumber}`)
        }
    }

    const onLayerClose = (index) => {
        setActiveIndex(index)
        setIsLayerOpen(false)
        document.body.style.overflowY='auto'
    }
    return (
        <>
            <div className="menuLisBox">
                {
                    /** 
                     * 각각의 swiperSlide컴포넌트는 고유한 인덱스를 갖고있다
                     * 반복적인 형태를 뭔가로 만들어서 뽑아낼때만 인덱스를 갖고있는것이 아니라, 날것 그대로의 리스트 배열이라
                     * 하여도, 이 각 리스트들은 고유한 인덱스를 갖고있다 ex) ul안에 li가 3개면 각 li는 0번째인덱스, 1번째인덱스 를 갖고있다
                     */
                }
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2.5}
                    style={{width:'100%', height:'100%'}}
                >
                    <SwiperSlide><a href="javascript:void(0)" onClick={() => onSelectDetailMenu(0, '추천메뉴')} className={activeIndex === 0 ? 'active': ''}><span className="img_cover"><img src={icon1} alt="추천메뉴"/></span><span>추천메뉴</span></a></SwiperSlide>
                    <SwiperSlide><a href="javascript:void(0)" onClick={() => onSelectDetailMenu(1, '치킨세트')} className={activeIndex === 1 ? 'active': ''}><span className="img_cover"><img src={icon2} alt="치킨세트"/></span><span>치킨&세트</span></a></SwiperSlide>
                    <SwiperSlide><a href="javascript:void(0)" onClick={() => onSelectDetailMenu(2, '버거세트')} className={activeIndex === 2 ? 'active': ''}><span className="img_cover"><img src={icon3} alt="버거세트"/></span><span>버거&세트</span></a></SwiperSlide>
                    <SwiperSlide><a href="javascript:void(0)" onClick={() => onSelectDetailMenu(3, '스낵사이드')} className={activeIndex === 3 ? 'active': ''}><span className="img_cover"><img src={icon4} alt="스낵사이드"/></span><span>스낵&사이드</span></a></SwiperSlide>
                    <SwiperSlide><a href="javascript:void(0)" onClick={() => onSelectDetailMenu(4, '음료')} className={activeIndex === 4 ? 'active': ''}><span className="img_cover"><img src={icon5} alt="음료"/></span><span>음료</span></a></SwiperSlide>
                    <SwiperSlide><a href="javascript:void(0)" onClick={() => onSelectDetailMenu(5, '주소등록')} className={activeIndex === 5 ? 'active': ''}><span className="img_cover"><img src={icon6} alt="주소등록"/></span><span>주소등록</span></a></SwiperSlide>
                </Swiper>
                {
                    showCategoryList && 
                    <div className="categoryListBox">
                        {                        
                            activeIndex === 0 || activeIndex === 1 || activeIndex === 2 || 
                            activeIndex === 3 || activeIndex === 4
                            ? <DetailCategory activeIndex={activeIndex} onProductClick={onProductClick}></DetailCategory> : null
                        }
                    </div>
                }
                {
                    isLayerOpen === true && activeLayer === 'LayerInfo3' ? <LayerInfo3 isLayerOpen={onSelectDetailMenu} isLayerClose={onLayerClose}></LayerInfo3> : null
                }
            </div>
        </>
    )
}

export default MenuList
