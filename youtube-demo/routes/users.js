//express 모듈 셋팅
const express = require("express")
const router = express.Router() //이 아이를 app.js에서 express 라우터로 사용할 수 있도록
const conn = require("../mariadb") //마리아 디비 소환

router.use(express.json()) //http 모듈외 'json'

router.post('/login', (req, res) => {//로그인
    //email이 디비에 저장된 회원인지 확인
    const { email, password } = req.body //email, pwd.. email가 디비에 저장된 회원인지 확인, pwd도 맞는지 비교
    let sql = 'SELECT * FROM users WHERE email = ?'
    conn.query(
        sql, email,
        function (err, results) { //function은 콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘, 순서 맞춰야함 (err,results,fields)
            let loginUser = results[0]
            if (loginUser && loginUser.password == password) {
                res.status(200).json({
                    msg: `${loginUser.name}님 환영합니다!`
                })
            }
            else {
                res.status(404).json({ //로그인 유저 입력값은 제대로 들어갔지만, 값을 찾는데 리소스가 없는 것이므로..
                    msg: "이메일 또는 비밀번호가 잘못 입력되었습니다."
                })
            }
        }
    )
})

//회원가입
router.post('/join', (req, res) => {
    const who = req.body //email, pwd, name, contact ..userId대신 이제 이메일
    if (who == {}) {
        res.status(400).json({
            message: "완전한 회원 정보를 입력해주세요."
        })
    }
    else {
        const { email, name, password, contact } = req.body
        let sql = 'INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)'
        let values = [email, name, password, contact]
        conn.query(
            sql, values,
            function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                res.status(201).json(results) //insert는 result가 따로 없다!
            }
        )
    }
})

router
    .route('/users')
    .get((req, res) => { //회원개별조회
        let { email } = req.body
        let sql = 'SELECT * FROM users WHERE email = ?'
        conn.query(
            sql, email,
            function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                res.status(200).json(results)
            }
        )

    })
    .delete((req, res) => { //회원개별탈퇴
        let { email } = req.body
        let sql = 'DELETE FROM users WHERE email = ?'
        conn.query(
            sql, email,
            function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                res.status(200).json(results)
            }
        )
    })


// app
//     .route('/users/:id')
//     .get(여기에 function 콜백함수 넣기)
//     .delete(여기에 function 콜백함수 넣기)\

module.exports = router