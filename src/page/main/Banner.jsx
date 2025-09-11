import React from 'react'
import banner1 from '../../img/banner_storesearch.png'
import banner2 from '../../img/banner_delivery.png'
import { useHistory } from 'react-router-dom'
import LayerInfo3 from '../layer/LayerInfo3'
import { setActiveIndex, setUpdateCategory, setLayerState } from '../../redux/action'
import { useDispatch, useSelector } from 'react-redux'

const Banner = () => {
    const navigate = useHistory()
  const dispatch = useDispatch()

  const isLayerOpen = useSelector(state => state.other.isLayerOpen)
  const activeLayer = useSelector(state => state.other.activeLayer)

  const onAddressSearch = () => { 
    dispatch(setActiveIndex(5))
    dispatch(setUpdateCategory(5))    
    dispatch(setLayerState(true, 'LayerInfo3'))
    // navigate(`/detail/category/5`)
    document.body.style.overflowY = 'hidden'     
  }

  const onLayerClose = () => {
    dispatch(setLayerState(false, null))
    document.body.style.overflowY='auto'
  }

  const onGoBestMenu = () => {
    dispatch(setActiveIndex(0))
    dispatch(setUpdateCategory(0))
    navigate.push(`/detail/category/0`)
  }

  return (
    <>
      <ul className="bannerBox">
        <li><a onClick={onAddressSearch} href="javascript:void(0)"><img src={banner1} alt=""/></a></li>
        <li><a onClick={onGoBestMenu} href="javascript:void(0)"><img src={banner2} alt=""/></a></li>
        {
          isLayerOpen && activeLayer === 'LayerInfo3' ? <LayerInfo3 isLayerOpen={onAddressSearch} isLayerClose={onLayerClose}></LayerInfo3> : null
        }
      </ul>
    </>
  )
}

export default Banner
