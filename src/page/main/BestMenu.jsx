import React, { useEffect, useState } from 'react'
// import sprite from '../../img/logo.jpg'
import { useDispatch, useSelector } from "react-redux"
import { fetchBestMenu, setLoading, setActiveIndex, setUpdateCategory } from '../../redux/action'
import { setSelectedBestMenuProductId } from '../../redux/setMenuAction'
import { useHistory } from 'react-router-dom'
import { fetchData } from '../../data/mockData'

const BestMenu = () => {
    const dispatch = useDispatch()
    const pageNavigate = useHistory()
    const [reviewCounts, setReviewCounts] = useState({})

    const bestMenu = useSelector(state => state.other.bestMenu)

    useEffect(()=> {
        dispatch(setLoading())
        dispatch(fetchBestMenu(bestMenu))
    }, [])

    // 리뷰 개수 가져오는 함수
    const fetchReviewCounts = async (products) => {
        const counts = {}
        for (const product of products) {
            try {
                // 로컬 스토리지에서 리뷰 조회
                const localReviews = JSON.parse(localStorage.getItem('reviews') || '[]')
                const deletedReviewIds = JSON.parse(localStorage.getItem('deletedReviewIds') || '[]')
                const filteredLocalReviews = localReviews.filter(review => review.productId === product.id)
                
                // 서버에서 리뷰 조회 (삭제된 리뷰 제외)
                const response = await fetchData('reviews', { productId: product.id })
                const serverReviews = response.data.filter(review => !deletedReviewIds.includes(review.id))
                
                // 로컬과 서버 리뷰를 병합하여 개수 계산
                const allReviews = [...serverReviews, ...filteredLocalReviews]
                const uniqueReviews = allReviews.filter((review, index, self) => 
                    index === self.findIndex(r => r.id === review.id)
                )
                
                counts[product.id] = uniqueReviews.length
            } catch (error) {
                counts[product.id] = 0
            }
        }
        setReviewCounts(counts)
    }

    // bestMenu가 변경될 때마다 리뷰 개수 가져오기
    useEffect(() => {
        if (bestMenu.length > 0) {
            fetchReviewCounts(bestMenu)
        }
    }, [bestMenu])

    const onDetailProduct = (param) => {
        dispatch(setActiveIndex(0));
        dispatch(setUpdateCategory(0));
        dispatch(setSelectedBestMenuProductId(param))
        // navigate
        pageNavigate.push(`/detail?id=${param}`)
    }

    const onGoBestMenu = () => {
        dispatch(setActiveIndex(0))
        dispatch(setUpdateCategory(0))
        pageNavigate.push(`/detail/category/0`)
    }
    return (
        <>
            <div className="bestBox">
                <div className="title">
                    {/* <img src={sprite} alt=""/> */}
                    <h2>BEST MENU</h2>
                </div>
                <div className="items">
                    <ul>
                        {
                            bestMenu.map((value, idx) => {
                                // console.log(`value = ${JSON.stringify(value)}`);
                                return   <li key={idx}>
                                            <a onClick={() => onDetailProduct(value.id)} href="javascript:void(0)">
                                                <img src={value.image || `/images/${value.id}.png`} alt={value.title}/> 
                                        {/**src>img로 하면 빌드과정 필요 및 빌드과정에서 변환, 그리고 import도 필요함. 
                                         * 따라서 정적파일(폰트,이미지, 아이콘)등은 public으로 넣고, 이는 빌드과정에 포함되지 않음*/}
                                                <span className="title_menu">{value.title}</span>
                                                <span className="sub_text">{value.subText}</span>
                                                <div className="review-info">
                                                    <span className="review-count">리뷰 {reviewCounts[value.id] || 0}개</span>
                                                </div>
                                                <span className="price">{value.price}</span>
                                            </a>
                                        </li>
                            })
                        }
                    </ul>
                </div>
                <div className="btnMoreMenu">
                    <a onClick={onGoBestMenu} href="javascript:void(0)">MORE MENU &gt;</a>
                </div>
            </div>
        </>
    )
}

export default BestMenu