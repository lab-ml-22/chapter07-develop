// 정적 데이터 (db.json에서 복사)
export const mockData = {
  "chickenSet": [
    {
      "id": "2176733",
      "title": "갓양념통다리8조각",
      "subText": "치킨나이트 1+1 제외",
      "price": 27000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/2176733_1.jpg",
      "category": "chickenSet"
    },
    {
      "id": "2176734",
      "title": "갓양념통다리12조각",
      "subText": "치킨나이트 1+1 제외",
      "price": 35000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/2176734_1.jpg",
      "category": "chickenSet"
    },
    {
      "id": "2176735",
      "title": "갓양념윙8조각",
      "subText": "치킨나이트 1+1 제외",
      "price": 25000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/2176735_1.jpg",
      "category": "chickenSet"
    }
  ],
  "bestMenu": [
    {
      "id": "2342896",
      "title": "오리지널 치킨",
      "subText": "바삭하고 촉촉한 KFC 오리지널 치킨",
      "price": 18000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/2342896_1.jpg",
      "category": "bestMenu"
    },
    {
      "id": "2342897",
      "title": "핫크리스피 치킨",
      "subText": "매콤하고 바삭한 핫크리스피 치킨",
      "price": 19000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/2342897_1.jpg",
      "category": "bestMenu"
    }
  ],
  "burgerSet": [
    {
      "id": "1234567",
      "title": "치킨버거 세트",
      "subText": "바삭한 치킨과 신선한 야채",
      "price": 12000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/1234567_1.jpg",
      "category": "burgerSet"
    }
  ],
  "snackSideSet": [
    {
      "id": "3456789",
      "title": "감자튀김",
      "subText": "바삭한 감자튀김",
      "price": 3000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/3456789_1.jpg",
      "category": "snackSideSet"
    }
  ],
  "drink": [
    {
      "id": "4567890",
      "title": "콜라",
      "subText": "시원한 콜라",
      "price": 2000,
      "img": "https://www.kfc.co.kr/upload/menu/thumb/4567890_1.jpg",
      "category": "drink"
    }
  ],
  "reviews": [
    {
      "id": "review-1",
      "productId": "2342896",
      "author": "김치킨",
      "rating": 5,
      "content": "정말 맛있어요! 양념이 잘 배어있고 바삭해서 좋았습니다.",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "review-2",
      "productId": "2342896",
      "author": "치킨러버",
      "rating": 4,
      "content": "가격 대비 만족스러운 맛이었어요. 다음에도 주문할 예정입니다.",
      "createdAt": "2024-01-14T15:20:00.000Z"
    }
  ],
  "sns": [
    {
      "id": "sns-1",
      "name": "Instagram",
      "url": "https://instagram.com/kfc_korea",
      "icon": "instagram"
    },
    {
      "id": "sns-2", 
      "name": "Facebook",
      "url": "https://facebook.com/kfckorea",
      "icon": "facebook"
    },
    {
      "id": "sns-3",
      "name": "YouTube",
      "url": "https://youtube.com/kfckorea",
      "icon": "youtube"
    }
  ]
};

// API 호출을 정적 데이터로 대체하는 함수
export const fetchData = async (endpoint, params = {}) => {
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let data = mockData[endpoint] || [];
  
  // 쿼리 파라미터 처리
  if (params.id) {
    data = data.filter(item => item.id == params.id);
  }
  
  if (params.productId) {
    data = data.filter(item => item.productId == params.productId);
  }
  
  return { data };
};
