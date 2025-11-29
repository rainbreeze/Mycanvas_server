// config/db.js
const mysql = require('mysql2');

// 여기에 팀장이 준 Railway 접속 정보 "그대로" 하드코딩
const pool = mysql.createPool({
    host: 'maglev.proxy.rlwy.net',              // Host
    port: 30153,                                // Port (숫자)
    user: 'root',                               // Username
    password: 'XKgncJXdXqGqAwJTOaPBAuSLxpZRYGqG', // Password 문자열 그대로 붙여넣기
    database: 'mycanvas_db',                    // 새 DB 이름
    waitForConnections: true,
    connectionLimit: 10,                        // 동시에 열 수 있는 커넥션 수
    queueLimit: 0,
    multipleStatements: true                    // 여러 쿼리 한 번에 실행 허용
});

// (선택) 연결 확인용 로그
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL 풀 연결 실패:', err);
        return;
    }
    console.log('MySQL 풀 연결 성공');
    connection.release(); // 풀에 반환
});

module.exports = pool;


