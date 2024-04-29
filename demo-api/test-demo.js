const express = require('express')
const app = express() //서버를 담았다

app.get('/test', function(req, res){
    res.send('TEST SUCCESS')
})

app.get('/test/1', function(req, res){
    res.send('One!!')
})

//서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234); //위치바껴도 상관없음.