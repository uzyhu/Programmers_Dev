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
    res.json({
        message : "test"
    })
})


app.get("/youtuber/:n",function(req,res){
    console.log(req.params.n);
    let {n} = req.params;
    n = parseInt(n);

    const youtuber = db.get(n);
    if(youtuber == undefined) {
        res.json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    }
    else {
        res.json(youtuber);
    }
})


app.use(express.json()) //http 외 모듈인 '미들웨어' : json 설정
app.post("/youtuber", (req,res) => {
    console.log(req.body)

    //등록..? Map(db)에 저장(put)해줘야해요
    db.set(id++,req.body)
    res.json({
        message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})