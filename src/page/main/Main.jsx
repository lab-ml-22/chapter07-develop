import React from 'react'
import TopRolling from './TopRolling'
import Banner from './Banner'
import BestMenu from './BestMenu'
import BannerOrder from './BannerOrder'
import SNS from './SNS'
import Youtube from './Youtube'
import Footer from './Footer'
import BottomNav from './BottomNav'

const Main = ({onNaviMenu}) => {
  return (
    <>
        <TopRolling></TopRolling>
        <Banner></Banner>
        <BestMenu></BestMenu>
        <BannerOrder></BannerOrder>
        <SNS></SNS>
        <Youtube></Youtube>
        <Footer></Footer>
        <BottomNav onNaviMenu={onNaviMenu}></BottomNav>
    </>
  )
}

export default Main