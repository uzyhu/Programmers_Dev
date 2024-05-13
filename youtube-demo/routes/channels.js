const express = require('express')
const router = express.Router()
const conn = require("../mariadb")

router.use(express.json())

let db = new Map()
let id = 1

router
    .route('/')
    .get((req, res) => { //회원별 채널 전체 조회
        let { userId } = req.body
        // let channels = [] //json형태로 배열처럼 보내는것, 리스트

        let sql = 'SELECT * FROM channels WHERE user_id = ?'
        if (userId) {
            conn.query(
                sql, userId,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    if (results.length) {
                        res.status(200).json(results)
                    }
                    else {
                        notFoundChannel(res)
                    }
                }
            )
        }
        else {
            res.status(400).end() //값을 안보내고 끝낼땐 end()
        }
    })
    .post((req, res) => { //채널 개별 생성
        const {name, user_id} = req.body //name, user_id들어감
        if (name && user_id) { //유효성 검사가 필요하다!
            let sql = 'INSERT INTO channels (name, user_id) VALUES (?, ?)'
            let values = [name, user_id]
            conn.query(
                sql, values,
                function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
                    res.status(201).json(results) //insert는 result가 따로 없다!
                }
            )
        }
        else {
            res.status(400).json({
                msg: `채널명을 입력해주세요.`
            })
        }
    })

function isExist(obj) {
    if (Object.keys(obj).length >= 1) {
        return true
    }
    else {
        return false
    }
}

router
    .route('/:id')
    .put((req, res) => { //채널 개별 수정
        let { id } = req.params
        id = parseInt(id)
        const beforeTitle = db.get(id).channelTitle
        if (db.get(id)) {
            db.set(id, req.body)
            res.status(200).json({
                msg: `${beforeTitle}님에서 ${req.body.channelTitle}님으로 변경 완료하였습니다.`
            })
        }
        else {
            notFoundChannel(res)
        }
    })
    .delete((req, res) => { //채널 개별 삭제
        let { id } = req.params
        id = parseInt(id) //url로 타고 들어오면 문자열 무조건 무조건 무조건.. 변형을 해줘야함,,,,,,
        let channel = db.get(id)

        if (channel) {
            db.delete(id)
            res.status(200).json({
                msg: `${channel.channelTitle}채널이 정상적으로 삭제되었습니다.`
            })
        }
        else {
            notFoundChannel(res)
        }
    })
    .get((req, res) => { //채널 개별 조회
        let { id } = req.params
        id = parseInt(id) //url로 타고 들어오면 문자열 무조건 무조건 무조건.. 변형을 해줘야함,,,,,,
        let sql = 'SELECT * FROM channels WHERE id = ?'
        conn.query(
            sql, id,
            function (err, results) { //콜백함수 => 앞에 sql 실행된 다음에 이 함수 실행해줘
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