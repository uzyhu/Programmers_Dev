//express 모듈 셋팅
const express = require("express")
const router = express.Router() //이 아이를 app.js에서 express 라우터로 사용할 수 있도록
const conn = require("../mariadb") //마리아 디비 소환
const { body, param, validationResult } = require('express-validator')

//jwt모듈
const jwt = require('jsonwebtoken')
//dotenv모듈
const dotenv = require('dotenv')
dotenv.config()

router.use(express.json()) //http 모듈외 'json'

const validate = (req, res, next) => { //validate를 미들웨어로 선언해서 문제생김
    const err = validationResult(req)

    if (err.isEmpty()) {//이 함수를 끝낼건데 여기서 끝나는게 아니라 다음 할 일 찾아가봐(미들웨어, 함수)
        return next()
    } else {
        return res.status(400).json(err.array()) //더 이상 밑에 안읽고 종료
    }
}

router.post(
    '/login',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 입력을 다시 해주세요'),
        body('password').notEmpty().isString().withMessage('비밀번호를 다시 작성해주세요'),
        validate
    ]
    , (req, res, next) => {//로그인
        //email이 디비에 저장된 회원인지 확인
        const { email, password } = req.body //email, pwd.. email가 디비에 저장된 회원인지 확인, pwd도 맞는지 비교
        let sql = 'SELECT * FROM users WHERE email = ?'
        conn.query(
            sql, email,
            function (err, results) { //function은 콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘, 순서 맞춰야함 (err,results,fields)
                if (err) {
                    console.log(err) //찾는데 에러가 날때.. 없는 id라던가 등
                    return res.status(400).end()
                }
                let loginUser = results[0]
                if (loginUser && loginUser.password == password) {
                    //token 발급
                    const token = jwt.sign({
                        email : loginUser.email,
                        name : loginUser.name
                    }, process.env.PRIVATE_KEY, {
                        expiresIn : '30m',
                        issuer : "zyzy"
                    })

                    res.cookie("token",token, {
                        httpOnly : true
                    }) //서버가 클라이언트한테 토큰을 보내줄때 쿠키에 담아 보낸다

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
router.post('/join',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 입력을 다시 해주세요'),
        body('password').notEmpty().isString().withMessage('비밀번호를 다시 작성해주세요'),
        body('name').notEmpty().isString().withMessage('이름을 다시 작성해주세요'),
        body('contact').notEmpty().isString().withMessage('연락처를 다시 작성해주세요'),
        validate
    ]
    , (req, res, next) => {
        const { email, name, password, contact } = req.body
        let sql = 'INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)'
        let values = [email, name, password, contact]
        conn.query(
            sql, values,
            function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                if (err) {
                    console.log(err) //찾는데 에러가 날때.. 없는 id라던가 등
                    return res.status(400).end()
                }
                res.status(201).json(results) //insert는 result가 따로 없다!
            }
        )
    })


//회원 개별 조회
router
    .route('/users')
    .get(
        [
            body('email').notEmpty().isEmail().withMessage('이메일 입력을 다시 해주세요'),
            validate
        ]
        , (req, res, next) => { //회원개별조회
            let { email } = req.body
            let sql = 'SELECT * FROM users WHERE email = ?'
            conn.query(
                sql, email,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (err) {
                        console.log(err) //찾는데 에러가 날때.. 없는 id라던가 등
                        return res.status(400).end()
                    }
                    res.status(200).json(results)
                }
            )

        })
    .delete( //회원 탈퇴
        [
            body('email').notEmpty().isEmail().withMessage('이메일 입력을 다시 해주세요'),
        ]
        , (req, res, next) => { //회원개별탈퇴
            let { email } = req.body
            let sql = 'DELETE FROM users WHERE email = ?'
            conn.query(
                sql, email,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (err) { //db단에서 해결되는 에러
                        console.log(err)
                        return res.status(400).end()
                    }
                    if (results.affectedRows == 0) {
                        return res.status(400).end()
                    }
                    else {
                        res.status(200).json(results)
                    }
                }
            )
        })


// app
//     .route('/users/:id')
//     .get(여기에 function 콜백함수 넣기)
//     .delete(여기에 function 콜백함수 넣기)\

module.exports = router