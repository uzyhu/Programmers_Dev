const express = require('express')
const router = express.Router()

router.use(express.json())

let db = new Map()
let id = 1

router
    .route('/')
    .get((req,res) => { //채널 전체 조회
        let {userId} = req.body
        let channels = [] //json형태로 배열처럼 보내는것, 리스트
        if(db.size && userId) { //userId가 비어져 있으면.. (로그아웃된)
                db.forEach((value) => {
                    if(userId === value.userId) {
                        channels.push(value)
                    }
                })

                if(channels.length){ //해당 Id로 조회할 채널이 없을때
                    res.status(200).json(channels) //엄연히 json array이기 때문에 잘감
                }
                else {
                    notFoundChannel()
                }
        }
        else {
            notFoundChannel()
        }
    }) 
    .post((req,res) => { //채널 개별 생성
        const {body} = req
        if(isExist(body)) {
            db.set(id++, body)
            res.status(201).json({
                msg : `${body.channelTitle}님의 채널을 응원합니다!`
            })
        }
        else {
            res.status(400).json({
                msg : `채널명을 입력해주세요.`
            })
        }
        console.log(db)
    })

function isExist(obj) {
    if(Object.keys(obj).length >=1 ) {
        return true
    }
    else {
        return false
    }
}

router
    .route('/:id')
    .put((req,res) => { //채널 개별 수정
        let {id} = req.params
        id = parseInt(id)
        console.log(db.get(id))
        const beforeTitle = db.get(id).channelTitle
        if(db.get(id)) {
            db.set(id, req.body)
            res.status(200).json({
                msg : `${beforeTitle}님에서 ${req.body.channelTitle}님으로 변경 완료하였습니다.`
            })
        }
        else {
            notFoundChannel()
        }
    })
    .delete((req,res) => { //채널 개별 삭제
        let {id} = req.params
        id = parseInt(id) //url로 타고 들어오면 문자열 무조건 무조건 무조건.. 변형을 해줘야함,,,,,,
        let channel = db.get(id)

        if(channel) {
            db.delete(id)
            res.status(200).json({
                msg : `${channel.channelTitle}채널이 정상적으로 삭제되었습니다.`
            })
        }
        else {
            notFoundChannel()
        }
    })
    .get((req,res) => { //채널 개별 조회
        let {id} = req.params
        id = parseInt(id) //url로 타고 들어오면 문자열 무조건 무조건 무조건.. 변형을 해줘야함,,,,,,
        let channel = db.get(id)
        if(channel) {
            res.status(200).json(channel)
        }
        else {
            notFoundChannel()
        }
    })

function notFoundChannel() {
    res.status(404).json({
        msg : "찾으시는 채널이 없습니다."
    })
}

module.exports = router