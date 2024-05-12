const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Youtube',
    dateStrings : true //날것의 형태를 수정
});

connection.query(
    'SELECT * FROM `users`',
    function(err, results, fields) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
        let {id, email, name, created_at} = results[0]
        console.log(results) //results => json array 형태로 날라옴
    }
)