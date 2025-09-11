<img width="1542" height="876" alt="image" src="https://github.com/user-attachments/assets/febdc73c-f26a-4370-b7e7-42506ec68e3a" />

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</p>
<br>
<p align="center">
   <h1><strong>KFC React Clone 프로젝트</strong>🍔</h1>

  <ul>
    <li><span>목표: KFC웹사이트를 클론하여, react와 redux를 활용한 상태관리 및 전자상거래 사이트의 구조를 파악</span></li>
    <li><span>기술스택: React 18.2.0, Redux, React Router v5, SCSS, Swiper</li>
    <li><span>배포링크: https://rainbow-liger-51da29.netlify.app/</span></li>
    <li><span>배포 플랫폼: Vercel → Netlify (2025-09-11)</span></li>
    <li>
      <span>주요기능</span>
      <ol>
        <li>별점평가(1~5점) 및 리뷰기능(CRUD) 추가(2025-09-11)</li>
        <li>카테고리별 제품 보기</li>
        <li>장바구니 담기 및 상태관리</li>
        <li>API를 통한 제품 데이터 연동 및 주소 검색</li>
        <li>장바구니와 상품상세페이지에서 사용자가 선택한 데이터 유지(redux-persist사용)</li>
      </ol>
    </li>
  </ul>

  <h2>ISSUE</h2>
  <ul>
    <li>
      <span>2025-09-11(목)</span>
      <ol>
        <li>
          <span> export 'useNavigate' was not found in 'react-router-dom'오류</span>
          <p>원인: React Router v5에서는 useHistory 사용</p>
          <p>해결방법: useNavigate를 useHistory로 변경</p>
        </li>
        <li>
          <span> export 'Routes' was not found in 'react-router-dom'오류</span>
          <p>해결방법:  Routes → Switch, element → render prop 변경</p>
        </li>
        <li>
          <span>JSON Server 의존성 제거</span>
          <p>원인: Netlify에서 JSON Server 실행 불가</p>
          <p>해결방법: 정적 데이터(src/data/mockData.js)로 전환</p>
        </li>
        <li>
          <span>Axios 의존성 제거</span>
          <p>원인: ReferenceError: axios is not defined</p>
          <p>해결방법: 모든 axios 호출을 fetchData 함수로 대체</p>
        </li>
         <li>
          <span>리뷰 작성 시 Axios 오류</span>
          <p>원인: 리뷰 작성/수정/삭제 시 axios 오류</p>
          <p>해결방법:  로컬 스토리지 기반 CRUD로 전환</p>
        </li>
        <li>
          <span>리뷰 삭제 영구 저장 문제</span>
          <p>원인: 리뷰 삭제 후 새로고침 시 다시 나타남</p>
          <p>해결방법: 삭제된 리뷰 ID 추적 시스템 구현</p>
        </li>
      </ol>
    </li>
    <li>
      <span>2025-09-09(화)</span>
      <ol>
        <li>
          <span>카테고리명과 카테고리 인덱스가 매칭이 안됨</span>
          <p>원인: 카테고리명은 리덕스로, 카레고리인덱스는 로컬에서관리</p>
          <p>해결방법: 카테고리인덱스도 리덕스로 관리</p>
        </li>
        <li>
          <span>카테고리 리스트에서 ‘장바구니아이콘’ 클릭 시 장바구니에 마지막으로 갖고있는 상품이 담김</span>
          <p>원인: 상태값을 '장바구니 클릭 시’에 전달안했고, 클릭 했을 때 상태구독중인 state들을 불러와서 객체에 넣은다음에 불러오고 있었음</p>
          <p>해결방법: productId를 ‘장바구니 클릭 시점’에 전달</p>
        </li>
        <li>
          <span>장바구니에서 상품을 삭제하고 json에 basket배열안에 데이터가 없이 비어있는 객체여도, 화면에는 계속 상품1개가 남아있던 오류</span>
          <p>원인: 리듀서에서 장바구니의 상품 지우는액션일 때, return부에 ‘장바구니를 부르는 상태’에다가 filter한 값을 넣어줬어야 했는데, 액션에 대한 상태값이 잘못들어가있었음</p>
          <p>해결방법: 삭제버튼 클릭 시, axios.delete에 삭제된 상품들을 통신으로 업데이트 하고, 장바구니의 내용을 부르는 디스패치 액션을 함</p>
        </li>
        <li>
          <span>사용자의 변심에 대해 대응못하고, 이전상품의 id로 장바구니에 보이는 오류(‘사용자의 변심’에 대한 설명: 내가 처음에 세트상품에서 옵션까지 추가해서먹으려고 옵션까지 선택 → 변심 → 커피나 마셔야지 라는 플로우를 가정)</span>
          <p>원인: 이전상품선택 시,  이전상품에 대한 옵션값이 선택되어 있는 상태에서 사용자가 변심하게 되면 상품의 id가 바뀌는건데 계속 변심하기 전인 이전상품의id가 장바구니에  담겨져 보였음, <br>
            redux-persist를 사용하다보니 상태를 계속 유지하기때문에 ‘커피’로 변심해서 장바구니 담아도 계속 이전상품의 id가 보이는 원인이 있었음</p>
          <p>해결방법: 장바구니 담는 액션에서 상품의 id와 옵션이름, 옵션값을초기화</p>
        </li>
        <li>
          <span>치킨메뉴 카테고리에서 닭다리를 선택했다가 스낵사이드 카테고리에서 비스켓 상품을 클릭하면 이전에 선택한 ‘닭다리 상품’이 잠깐 보이는 오류</span>
          <p>원인: navigate를 하기 전에, 상태에 관한 업데이트가 선행되지 않음</p>
          <p>해결방법: 화면 리렌더링 되는 시점과 관련이 있었고, 리렌더링 되는 동안 ‘로딩ui’를 추가함</p>
        </li>
      </ol>
    </li>
  </ul>
</p>
