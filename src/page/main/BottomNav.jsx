import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUpdateCategory, setActiveIndex, setCategoryTitle } from '../../redux/action'
import LayerInfo3 from '../layer/LayerInfo3'

const BottomNav = ({onNaviMenu}) => {
  const navigate = useHistory()
  const dispatch = useDispatch()

  const onBasket = () => {
    alert(`주문결제PG연결이 안되어\n장바구니 화면으로 이동합니다`)
    navigate.push(`/basket`)
  }

  const onSetHome = () => {
    navigate.push(`/`)
  }

  const [isLayerOpen, setIsLayerOpen] = useState(false)
  const [activeLayer, setActiveLayer] = useState(null)

  const onMoveCategory = (categoryNumber, cateName) => {
      dispatch(setUpdateCategory(categoryNumber))
      dispatch(setActiveIndex(categoryNumber))
      dispatch(setCategoryTitle(cateName))
      if(categoryNumber === 5) { // 5번이면 '주소등록' 딤드레이어팝업을 보여줌
        setIsLayerOpen(true)
        setActiveLayer('LayerInfo3')
      }
      // navigate(`/detail/category/${categoryNumber}`)
  }

  const onLayerClose = (index) => {
      setActiveIndex(index)
      setIsLayerOpen(false)
      document.body.style.overflowY='auto'
  }

  return (
    <>
        <div className="bottomNavbox">
            <ul>
                <li><a onClick={onSetHome} href="javascript:void(0)"><span>홈</span></a></li>
                <li><a onClick={onNaviMenu} href="javascript:void(0)"><span>리스트</span></a></li>
                <li><a onClick={() => onMoveCategory(5, '주소등록')} href="javascript:void(0)"><span>딜리버리</span></a></li>
                <li><a href="javascript:void(0)" onClick={onBasket}><span>마이페이지</span></a></li>
            </ul>
        </div>
        {
            isLayerOpen === true && activeLayer === 'LayerInfo3' ? <LayerInfo3 isLayerOpen={onMoveCategory} isLayerClose={onLayerClose}></LayerInfo3> : null
        }
    </>
  )
}

export default BottomNav