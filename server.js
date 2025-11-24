const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  // ⬅️ 이미지 정적 경로를 위해 필요
const db = require('./config/db');  // config/db.js에서 연결한 데이터베이스를 가져옴

// 필요한 라우터 불러오기
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const mypageRoutes = require('./routes/mypageRoutes');

const app = express();

// ✅ 정적 폴더 설정 - 업로드한 이미지 접근 허용
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우터 사용
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/mypage', mypageRoutes);  // 마이페이지 및 프로필 이미지 업로드 라우트 포함

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
