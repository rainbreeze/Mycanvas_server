// controllers/registerController.js

const registerModel = require('../models/registerModel');  // 회원가입 모델 가져오기

// 회원가입 API 처리
const register = (req, res) => {
    const { userId, email, password, userName } = req.body;

    // 비밀번호 해싱
    registerModel.hashPassword(password, (err, hashedPassword) => {
        if (err) {
            console.error('비밀번호 해싱 실패:', err);
            return res.status(500).json({ message: '비밀번호 해싱 실패' });
        }

        // 사용자 등록
        registerModel.createUser(userId, email, hashedPassword, userName, (err, result) => {
            if (err) {
                console.error('회원가입 실패:', err);
                return res.status(500).json({ message: '회원가입 실패' });
            }
            res.status(200).json({ message: '회원가입 성공!' });
        });
    });
};

module.exports = {
    register,
};
