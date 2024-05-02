//express 모듈 셋팅
const express = require("express")
const app = express()
app.listen(7777)

let db = new Map()

let id = 1 //하나의 객체를 유니크하게 구별하기 위함

app.use(express.json())
//로그인
app.post('/login',(req,res) => {
    const who = req.body
    let whoIs = db.forEach((element) => {
        element == who
    })
    if(whoIs) {
        res.status(200).json({
            message : `${who.name}님, 환영합니다!`
        })
    }
    else {
        res.status(400).json({
            message : "해당하는 정보의 회원이 없습니다."
        })
    }
})
//회원가입
app.post('/join',(req,res) => {
    const who = req.body
    console.log(who)
    if(who == {}) {
        res.status(400).json({
            message : "완전한 회원 정보를 입력해주세요."
        })
    }
    else {
        db.set(id++, who)
        res.status(201).json({
            message : `${db.get(id-1).name}님, 환영합니다!`
        })
    }
})

// app
//     .route('/users/:id')
//     .get(여기에 function 콜백함수 넣기)
//     .delete(여기에 function 콜백함수 넣기)

//회원 개별 조회
app.get('/users/:id',(req,res) => {
    let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)
    if(user == undefined) {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    } else {
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    }
})
//회원 개별 탈퇴
app.delete('/users/:id',(req,res) => {
    let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)
    if(user == undefined) {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    } else {
        db.delete(id)

        res.status(200).json({
            message : `${user.name}님 다음에 또 뵙겠습니다!`
        })
    }
})