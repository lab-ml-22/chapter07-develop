import React from 'react'

const Footer = () => {
    return (
        <>
            <footer>
                <ul>
                    <li><a href="#!">개인정보처리방침</a></li>
                    <li><a href="#!">사이트 이용약관</a></li>
                    <li><a href="#!">위치정보 이용약관</a></li>
                    <li><a href="#!">선불카드 이용약관</a></li>
                    <li><a href="#!">영상정보처리기기 운영관리방침</a></li>
                </ul>
                <address>
                    <span>서울 버거구 버거동 100번지</span>
                    <span>사업자등록번호: 100-abc-defghi/주식회사 BurgerNara12345</span>
                    <span>대표자:버거사랑버거주인/TEL:02)abc-defg월~금9:00~12:00,</span>
                    <span>13:00~17:00공휴일 제외/FAX:02)hijk-lmno</span>
                </address>
                <p className="copyright">ⓒ 서기100, BURGER USA Co., Ltd. All Rights Reserved.</p>
            </footer>
        </>
    )
}

export default Footer
