# Backend Application

NestJS + TypeORM + PostgreSQL 백엔드 애플리케이션

## 시작하기

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mydatabase

# Application
PORT=3000
NODE_ENV=development
```

### 2. Docker Compose로 PostgreSQL 실행

```bash
# PostgreSQL 컨테이너 시작
docker-compose up -d

# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f postgres
```

### 3. 의존성 설치 및 애플리케이션 실행

```bash
# 의존성 설치
npm install

# 개발 모드로 실행
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

## Docker Compose 명령어

### 기본 명령어

```bash
# 컨테이너 시작
docker-compose up -d

# 컨테이너 중지
docker-compose down

# 컨테이너와 볼륨 모두 삭제 (데이터베이스 초기화)
docker-compose down -v

# 컨테이너 재시작
docker-compose restart

# 로그 확인
docker-compose logs -f
```

### PostgreSQL 직접 접근

```bash
# PostgreSQL 컨테이너에 접속
docker-compose exec postgres psql -U postgres -d mydatabase

# 데이터베이스 백업
docker-compose exec postgres pg_dump -U postgres mydatabase > backup.sql

# 데이터베이스 복원
docker-compose exec -T postgres psql -U postgres mydatabase < backup.sql
```

## pgAdmin 사용하기

Docker Compose에 pgAdmin이 포함되어 있습니다.

1. 브라우저에서 `http://localhost:5050` 접속
2. 로그인 정보:
   - Email: `admin@admin.com`
   - Password: `admin`
3. 서버 추가:
   - Host: `postgres` (Docker 네트워크 내부에서는 서비스 이름 사용)
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`

## 프로젝트 구조

```
src/
├── config/          # 설정 파일
│   └── db.config.ts # 데이터베이스 설정
├── resource/        # 리소스(도메인) 모듈
│   └── accout/
│       ├── entities/      # 엔티티
│       ├── accout.controller.ts
│       └── accout.module.ts
├── app.module.ts    # 루트 모듈
└── main.ts          # 애플리케이션 진입점
```

## 개발 스크립트

```bash
# 개발 모드 (파일 변경 감지)
npm run start:dev

# 디버그 모드
npm run start:debug

# 테스트
npm run test
npm run test:watch
npm run test:cov

# E2E 테스트
npm run test:e2e

# 린트
npm run lint

# 포맷팅
npm run format
```

## 환경별 설정

### 개발 환경
- `synchronize: true` - 엔티티 변경 시 자동으로 DB 스키마 업데이트
- `logging: true` - SQL 쿼리 로깅 활성화

### 프로덕션 환경
- `synchronize: false` - 마이그레이션 사용 권장
- `logging: false` - 성능을 위해 로깅 비활성화
- 환경 변수는 `.env.production` 사용

## 문제 해결

### 포트 충돌
PostgreSQL 기본 포트(5432)가 이미 사용 중인 경우:

```yaml
# docker-compose.yml에서 포트 변경
ports:
  - '5433:5432'  # 로컬:컨테이너
```

그리고 `.env`에서도 변경:
```bash
DB_PORT=5433
```

### 데이터베이스 초기화
```bash
docker-compose down -v
docker-compose up -d
```
