import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { setSearchAddress } from '../../redux/action'

const LayerInfo3 = ({isLayerOpen, isLayerClose}) => {
    const dispatch = useDispatch()
    const choiceAddress = useSelector(state => state.other.searchAddress)

    // 카카오우편번호 템플릿을 호출하는 함수
    const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
  
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
  
      console.log(`fullAddress는 = ${fullAddress}`); // ex)삼성동이라고 검색해서 내가 원하는 주소 선택하면 콘솔로그에 뜸
      dispatch(setSearchAddress(fullAddress))
    };
  
    const handleClick = () => {
      open({ onComplete: handleComplete })
    }
  
    if(!isLayerOpen) {
        return null // false일때 컴포넌트 렌더링 하지 않기 위한 조건_이LayerInfo3.jsx를 불러오기위한 부모컴포넌트
                    // DeliveryAddress컴포넌트에서 if조건에 ' : null'을 줬기때문에 if부정연산자 조건의 결과에 return null을 해주는거임
    }
    return (
        <>
             <div className="layoutBox">
                <div className="inner">
                    <div className="panel">
                        <button onClick={isLayerClose}>닫기</button>
                        <div className="cover">
                            <div className="post">
                                <h2>배달받을 주소</h2>
                                <div className="search">
                                    <a className="btn_search" onClick={handleClick} href="#!">주소찾기</a>
                                </div>
                                <div className="list-wrapper">
                                    <div className="info">
                                        <p>'주소찾기'버튼을 누르면 카카오우편번호 검색화면으로 연결됩니다</p>
                                        <dl>
                                            <dt>입력한 주소</dt>
                                            <dd>{choiceAddress}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <p className="btn-cover">
                                    <a className="btn" onClick={isLayerClose} href="#!">닫기</a>
                                    <a className="btn_ok" onClick={isLayerClose} href="#!">확인</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayerInfo3;