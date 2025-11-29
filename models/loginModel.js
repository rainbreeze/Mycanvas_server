// models/loginModel.js

const bcrypt = require('bcryptjs');
const db = require('../config/db');  // DB 연결

// 사용자 정보 조회 함수
const getUserById = (userId, callback) => {
    const query = 'SELECT * FROM users WHERE userId = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// 비밀번호 비교 함수
const comparePassword = (enteredPassword, storedPasswordHash, callback) => {
    bcrypt.compare(enteredPassword, storedPasswordHash, (err, isMatch) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, isMatch);
    });
};

module.exports = {
    getUserById,
    comparePassword,
};
