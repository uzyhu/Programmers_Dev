//express 모듈 셋팅
const express = require("express")
const router = express.Router() //이 아이를 app.js에서 express 라우터로 사용할 수 있도록

let db = new Map()

let id = 1 //하나의 객체를 유니크하게 구별하기 위함

router.use(express.json())
//로그인
router.post('/login',(req,res) => {
    const {userId, pwd} = req.body         //userId, pwd.. userId가 디비에 저장된 회원인지 확인, pwd도 맞는지 비교
    let loginUser = {}
    db.forEach((element) => {
        //a: value(객체), b: key, c: Map
        if(element.userId === userId) { //userId 같은지 비교
            loginUser = element
        }
    })

    if(isExist(loginUser)) { 
        if(loginUser.pwd === pwd) { //pwd도 비교
            res.status(200).json({
                msg : `${loginUser.name}님 환영합니다!`
            })
        }
        else {
            res.status(400).json({
                msg : "비밀번호가 틀렸습니다."
            })
        }
    } else {
        res.status(404).json({ //로그인 유저 입력값은 제대로 들어갔지만, 값을 찾는데 리소스가 없는 것이므로..
            msg : "입력하신 아이디는 회원가입이 되지 않은 아이디입니다."
        })
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
router.post('/join',(req,res) => {
    const who = req.body
    console.log(who)
    if(who == {}) {
        res.status(400).json({
            message : "완전한 회원 정보를 입력해주세요."
        })
    }
    else {
        db.set(who.userId, who)
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
router.get('/users',(req,res) => {
    let {userId} = req.body

    const user = db.get(userId)
    if(user) {
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
})
//회원 개별 탈퇴
router.delete('/users',(req,res) => {
    let {userId} = req.body

    const user = db.get(userId)
    if(user) {
        db.delete(id)

        res.status(200).json({
            message : `${user.name}님 다음에 또 뵙겠습니다!`
        })
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
})

module.exports = router