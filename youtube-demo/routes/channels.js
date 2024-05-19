const express = require('express')
const router = express.Router()
const conn = require("../mariadb")
const { body, param, validationResult } = require('express-validator')

router.use(express.json())

const validate = (req, res, next) => { //validate를 미들웨어로 선언해서 문제생김
    const err = validationResult(req)

    if (err.isEmpty()) {//이 함수를 끝낼건데 여기서 끝나는게 아니라 다음 할 일 찾아가봐(미들웨어, 함수)
        return next()
    } else {
        return res.status(400).json(err.array()) //더 이상 밑에 안읽고 종료
    }
}

router
    .route('/')
    .get(
        [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
            validate    //핸들러
        ]
        , (req, res, next) => { //회원별 채널 전체 조회

            let { userId } = req.body
            // let channels = [] //json형태로 배열처럼 보내는것, 리스트

            let sql = 'SELECT * FROM channels WHERE user_id = ?'
            conn.query(
                sql, userId,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (err) {
                        console.log(err) //찾는데 에러가 날때.. 없는 id라던가 등
                        return res.status(400).end()
                    }
                    if (results.length) {
                        res.status(200).json(results)
                    }
                    else {
                        notFoundChannel(res) //찾는 채널의 길이가 0일때
                    }
                }
            )
        })
    .post(
        [body('user_id').notEmpty().isInt().withMessage('숫자 입력 필요'),
        body('name').notEmpty().isString().withMessage('이름 입력 필요'),
            validate]//유효성 검사 먼저할게~!
        , (req, res, next) => { //채널 개별 생성

            const { name, user_id } = req.body //name, user_id들어감
            let sql = 'INSERT INTO channels (name, user_id) VALUES (?, ?)'
            let values = [name, user_id]
            conn.query(
                sql, values,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }
                    res.status(201).json(results) //insert는 result가 따로 없다!
                }
            )
        })

// function isExist(obj) {
//     if (Object.keys(obj).length >= 1) {
//         return true
//     }
//     else {
//         return false
//     }
// }

router
    .route('/:id')
    .put([param('id').notEmpty().withMessage('채널 id 필요'),
    body('name').notEmpty().withMessage('채널 name 필요'),
        validate]
        , (req, res, next) => { //채널 개별 수정
            let { id } = req.params
            id = parseInt(id)
            let { name } = req.body
            let sql = 'UPDATE channels SET name = ? WHERE id = ?'
            let values = [name, id]
            conn.query(
                sql, values,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (err) {
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
    .delete([param('id').notEmpty().isInt().withMessage('채널 id 필요'), validate]
        , (req, res, next) => { //채널 개별 삭제

            let { id } = req.params
            id = parseInt(id) //url로 타고 들어오면 문자열 무조건 무조건 무조건.. 변형을 해줘야함,,,,,,

            let sql = 'DELETE FROM channels WHERE id = ?'
            conn.query(
                sql, id,
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
    .get(
        [param('id').notEmpty().withMessage('채널 id 필요'),
            validate
        ]
        , (req, res, next) => { //채널 개별 조회

            let { id } = req.params
            id = parseInt(id) //url로 타고 들어오면 문자열 무조건 무조건 무조건.. 변형을 해줘야함,,,,,,
            let sql = 'SELECT * FROM channels WHERE id = ?'
            conn.query(
                sql, id,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }
                    if (results.length) {
                        res.status(200).json(results)
                    }
                    else {
                        notFoundChannel(res)
                    }
                }
            )
        })

function notFoundChannel(res) {
    res.status(404).json({
        msg: "찾으시는 채널이 없습니다."
    })
}

module.exports = router