// config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'nozomi.proxy.rlwy.net',
    user: 'root',
    password: 'QsZXWjmpzqhZNGlZYZHQiEMmDeXNmFyz',
    database: 'railway',
    port: 21532,
    waitForConnections: true,
    connectionLimit: 10,            // 동시에 열 수 있는 커넥션 수
    queueLimit: 0,
    multipleStatements: true        // 여러 쿼리 실행 가능하게 함
});

// (선택) 연결 확인
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL 풀 연결 실패:', err);
        return;
    }
    console.log('MySQL 풀 연결 성공');
    connection.release(); // 풀에 반환
});

module.exports = pool;
