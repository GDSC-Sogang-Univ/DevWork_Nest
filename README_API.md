# Carrot Market API

Nest.js 기반 당근마켓 스타일 상품 조회 API 서버

## API 엔드포인트

### 1. 상품 목록 조회 (커서 페이지네이션)
```
GET /articles?cursor={lastArticleId}&limit={number}
```

**Query Parameters:**
- `cursor` (optional): 이전 페이지의 마지막 상품 ID
- `limit` (optional): 한 번에 가져올 상품 수 (기본값: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "상품명",
      "price": 100000,
      "location": "강남구",
      "imageUrl": "https://...",
      "likeCount": 10,
      "chatCount": 5,
      "status": "SALE",
      "category": "디지털기기",
      "description": "상품 설명",
      "userId": "user_1",
      "userName": "사용자1",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "nextCursor": "next-article-uuid",
  "hasMore": true
}
```

### 2. 상품 상세 조회
```
GET /articles/{id}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "상품명",
  "price": 100000,
  "location": "강남구",
  "imageUrl": "https://...",
  "likeCount": 10,
  "chatCount": 5,
  "status": "SALE",
  "category": "디지털기기",
  "description": "상품 설명",
  "userId": "user_1",
  "userName": "사용자1",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 개발 환경 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start:dev

# 프로덕션 빌드
yarn build

# 프로덕션 실행
yarn start:prod
```

## Docker 실행

### 방법 1: Docker Compose 사용 (권장)
```bash
# 빌드 및 실행
docker-compose up -d

# 중지
docker-compose down
```

### 방법 2: Docker 직접 사용
```bash
# 이미지 빌드
docker build -t carrot-market-api .

# 컨테이너 실행
docker run -p 3000:3000 -d carrot-market-api
```

## 환경 변수

`.env.example` 파일을 참고하여 `.env` 파일을 생성하세요:
```
NODE_ENV=production
PORT=3000
```

## 특징

- 500개의 Mock 데이터 자동 생성
- 커서 기반 페이지네이션으로 대용량 데이터 효율적 처리
- TypeScript 및 Class Validator를 통한 타입 안정성
- Docker를 통한 쉬운 배포