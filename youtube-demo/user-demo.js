//express 모듈 셋팅
const express = require("express")
const app = express()
app.listen(7777)

let db = new Map()

let id = 1 //하나의 객체를 유니크하게 구별하기 위함

app.use(express.json())
//로그인
app.post('/login',(req,res) => {
    const {userId, pwd} = req.body         //userId, pwd.. userId가 디비에 저장된 회원인지 확인, pwd도 맞는지 비교
    let loginUser = {}
    db.forEach((element) => {
        //a: value(객체), b: key, c: Map
        if(element.userId === userId) { //userId 같은지 비교
            loginUser = element
        }
    })

    if(isExist(loginUser)) { 
        console.log("아이디 발견했습니다.")
        if(loginUser.pwd === pwd) { //pwd도 비교
            console.log("비밀번호도 일치합니다.")
        }
        else {
            console.log("비밀번호가 일치하지 않습니다.")
        }
    } else {
        console.log("입력하신 아이디는 회원가입이 되지 않은 아이디입니다.")
    }
})

function isExist(obj) { //비어있는지 확인
    if(Object.keys(obj).length) {
        return true
    } else {
        return false
    }
}

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