// db.json의 실제 데이터를 사용
import dbData from '../../db.json';

// API 호출을 정적 데이터로 대체하는 함수
export const fetchData = async (endpoint, params = {}) => {
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let data = dbData[endpoint] || [];
  
  // 쿼리 파라미터 처리
  if (params.id) {
    data = data.filter(item => item.id == params.id);
  }
  
  if (params.productId) {
    data = data.filter(item => item.productId == params.productId);
  }
  
  return { data };
};

// db.json 데이터를 그대로 export
export const mockData = dbData;