import React, { useEffect } from 'react'
// import sprite from '../../img/sprite.png'
import { connect } from "react-redux"
import {fetchSNSList} from '../../redux/action'

const mapStateToProps = state => {
    return {
        snsList: state.other.snsList
    }
}

const mapDispatchtoProps = dispatch => { // useEffect로 데이터를 가져와서 의존성배열의 상태에 따라 useEffect를 활용하므로 dispatch가 필요하다
    return {
        fetchSNSList:() => dispatch(fetchSNSList())
    }
}

const SNS = ({snsList, fetchSNSList}) => {

    useEffect(()=> {
        fetchSNSList()
    }, [fetchSNSList]) 

    return (
        <>
            <div className="snsBox">
                <div className="title">
                    {/* <img src={sprite} alt=""/> */}
                    <h2>BURGER FACEBOOK,<br/>INSTAGRAM</h2>
                </div>
                <div className="items">
                    <ul>
                        {
                           snsList.map((value, idx) => {                                
                                return  <li key={idx}>
                                            <a href="javascript:void(0)">
                                                <img src={`/images/${value.id}.jpg`} alt=""/>
                                            </a>
                                            <p>
                                                <span className="writer"><img src="https://www.kfckorea.com/static/img/common/fandom_instagram.png" alt=""/><span>burger_korea</span></span>
                                                <span className="media">+팔로워</span>
                                            </p>
                                        </li>
                            })
                        }                        
                    </ul>
                </div>
            </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchtoProps)(SNS)
