// controllers/loginController.js

const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');  // 로그인 모델 가져오기

// ✅ .env 에서 JWT 비밀 키 가져오기
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// 로그인 API 처리
const login = (req, res) => {
    console.log('로그인 컨트롤러');
    const { userId, password } = req.body;

    // 사용자 정보 조회
    loginModel.getUserById(userId, (err, result) => {
        console.log('getUserById 호출됨');  // 여기가 찍히나 확인
        if (err) {
            console.error('로그인 실패:', err);
            return res.status(500).json({ message: '로그인 실패' });
        }

        // 사용자 존재하지 않음
        if (result.length === 0) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = result[0];
        console.log('정보: ', user);

        // ✅ 비밀번호 비교 시 password_hash 사용
        loginModel.comparePassword(password, user.password_hash, (err, isMatch) => {
            console.log('comparePassword 호출됨');
            if (err) {
                console.error('비밀번호 비교 실패:', err);
                return res.status(500).json({ message: '로그인 실패' });
            }

            // 비밀번호 일치하지 않음
            if (!isMatch) {
                return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            const token = jwt.sign(
                {
                    userId: user.userId,
                    userName: user.userName,
                    profileImage: user.profileImage,
                },
                JWT_SECRET,
                // 원래 1h 였는데, .env의 JWT_EXPIRES_IN 도 쓸 수 있음
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );

            // ✅ LoginPage.js 가 기대하는 형식: { message: '로그인 성공!', token }
            res.status(200).json({ message: '로그인 성공!', token });
        });
    });
};

module.exports = {
    login,
};
