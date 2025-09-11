const fs = require('fs');
const path = require('path');

// db.json 파일 읽기
const dbPath = path.join(__dirname, '../../db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters } = event;
  
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // 경로에서 리소스 추출 (예: /bestMenu, /chickenSet 등)
    const resource = path.replace('/', '');
    
    if (!db[resource]) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Resource not found' })
      };
    }

    let data = db[resource];
    
    // 쿼리 파라미터 처리 (id 필터링)
    if (queryStringParameters && queryStringParameters.id) {
      data = data.filter(item => item.id == queryStringParameters.id);
    }
    
    // productId 필터링 (리뷰용)
    if (queryStringParameters && queryStringParameters.productId) {
      data = data.filter(item => item.productId == queryStringParameters.productId);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
