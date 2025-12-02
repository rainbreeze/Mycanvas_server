// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');           // 업로드 이미지 정적 경로
const db = require('./config/db');      // config/db.js에서 연결한 데이터베이스

// 라우터
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const mypageRoutes = require('./routes/mypageRoutes');

const app = express();

// 정적 폴더 설정 - 업로드한 이미지 접근 허용
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 미들웨어
app.use(cors());
app.use(express.json());               // bodyParser 대신 express 내장 사용

// 🔐 회원 관련 라우트
// 최종 엔드포인트:
//   POST http://localhost:3001/register  (회원가입)
//   POST http://localhost:3001/login     (로그인)
//   GET/POST http://localhost:3001/mypage ... (마이페이지 관련)

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/mypage', mypageRoutes);

// 헬스체크용 엔드포인트 (서버 살아있는지 확인)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 예시
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// 모든 activity 조회
app.get('/activities', (req, res) => {
  const query = 'SELECT id, name FROM activity';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 조회 실패' });
    }
    res.json(results);
  });
});

// activity 추가
app.post('/activities', (req, res) => {
  const { name, image } = req.body;
  if (!name) return res.status(400).json({ error: 'name 필수' });

  const query = 'INSERT INTO activity (name, image) VALUES (?, ?)';
  db.query(query, [name, image || null], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 삽입 실패' });
    }
    res.json({ message: 'Activity 추가 성공', id: result.insertId });
  });
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
