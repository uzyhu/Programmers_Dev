const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Youtube',
    dateStrings : true //날것의 형태를 수정
});

module.exports = connection;