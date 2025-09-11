const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters } = event;
  
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
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
    // db.json 파일 읽기
    const dbPath = path.join(process.cwd(), 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // 경로에서 리소스 추출 (예: /bestMenu, /chickenSet 등)
    const resource = path.replace('/', '');
    
    console.log('Requested resource:', resource);
    console.log('Available resources:', Object.keys(db));
    
    if (!db[resource]) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'Resource not found',
          requested: resource,
          available: Object.keys(db)
        })
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

    console.log('Returning data:', data.length, 'items');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack
      })
    };
  }
};
