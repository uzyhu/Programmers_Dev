//express 모듈 셋팅
const express = require("express");
const app = express();
app.listen(1234);


//데이터 셋팅
let db = new Map();

let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726개"
}

var id =1 //let은 블록스코프때문에 사용못함

db.set(id++,youtuber1);
db.set(id++,youtuber2);
db.set(id++,youtuber3);

app.get('/youtubers', function (req,res){
    // db.forEach(function(youtuber){
    //     console.log(youtuber)
    // })

    var youtubers = {}
    
    if(db.size !== 0) { //map은 비워지면 undefined가 아닌 사이즈가 0이라고 다뤄야 한다.
        db.forEach(function(value, key){
            youtubers[key] = value
        })
        res.json(youtubers)
    } else {
        res.status(404).json({
            message : "조회할 유튜버가 없습니다."
        })
    }
})


app.get("/youtubers/:n",function(req,res){
    console.log(req.params.n);
    let {n} = req.params;
    n = parseInt(n);

    const youtuber = db.get(n);
    if(youtuber == undefined) {
        res.status(404).json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }
    else {
        res.json(youtuber);
    }
})


app.use(express.json()) //http 외 모듈인 '미들웨어' : json 설정, request로 날아오는 값을 json으로 읽어볼 수 있다
app.post("/youtubers", (req,res) => {
    const channelTitle = req.body.channelTitle
    if(channelTitle) {
        //등록..? Map(db)에 저장(put)해줘야해요
        db.set(id++,req.body)
        res.status(201).json({
            message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
        })
    } else {
        res.status(400).json({
            message : "등록할 채널 이름을 입력해주세요."
        })
    }
})

app.delete("/youtubers/:id", (req, res)=> {
    let {id} = req.params;
    id = parseInt(id);

    var youtuber = db.get(id)
    if(youtuber) {
        let channelTitle = youtuber.channelTitle 
        db.delete(id)

        res.json({
        message : `${channelTitle}님, 아쉽지만 우리 인연은 여기까지..`
    })
    }

    else {
        console.log(youtuber)
        res.status(404).json({
            message : "해당 유튜버 정보를 찾을 수 없습니다."
        })
    }
})

app.delete("/youtubers", (req,res) => {
    
    var msg = ""
    if(db.size>=1){ //db에 값이 1개 이상이면, 전체 삭제
        db.clear()
        res.json({
            message : "전체 유튜버가 삭제되었습니다."
        })
    } else { //값이 없으면, "삭제할 유튜버가 없습니다."
        res.status(404).json({
            message : "삭제할 유튜버가 없습니다."
        })
        msg = "삭제할 유튜버가 없습니다."
    }
})

app.put("/youtubers/:id",(req,res) => {
    let {id} = req.params;
    id = parseInt(id);

    var youtuber = db.get(id)
    var oldTitle = youtuber.channelTitle
    if(youtuber == undefined) {
        res.status(404).json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }

    else {
        var newTitle = req.body.channelTitle
        youtuber.channelTitle = newTitle
        db.set(id, youtuber)

        res.json({
        message : `${oldTitle}님, 채널명이 ${newTitle}로 수정되었습니다.`
    })
    }
})