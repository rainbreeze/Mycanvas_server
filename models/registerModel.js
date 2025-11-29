// models/registerModel.js

const bcrypt = require('bcryptjs');
const db = require('../config/db');  // DB 연결

// 비밀번호 해싱
const hashPassword = (password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, hashedPassword);
    });
};

// 사용자 등록 함수
const createUser = (userId, email, hashedPassword, userName, callback) => {
    // ✅ password -> password_hash 로 변경
    const query = 'INSERT INTO users (userId, email, password_hash, userName) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, email, hashedPassword, userName], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    hashPassword,
    createUser,
};
