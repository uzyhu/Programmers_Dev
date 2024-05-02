const express = require('express')
const app = express() //서버를 담았다
//서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234); //위치바껴도 상관없음.

const family = [
    { id : 1, name : 'uzyhu'},
    { id : 2, name : 'yong'},
    { id : 3, name : 'wzy'},
    { id : 4, name : 'jjun'},
]

//구성원 전체 조회
app.get('/family', (req,res) => {
    res.json(family) //json모양 배열 , json array
})
//구성원 개별 조회
app.get('/family/:id', (req,res) => { //문자열로 id들어옴
    let {id} = req.params
    console.log(typeof(id))
    // let person = {}
    let person = family.find(f => f.id == id) //배열 안에 있는 객체에서 찾을 건데 객체의 아이디가 요청 온 아이디와 같으면..
    // family.forEach(element => {
    //     if(element.id == id) { 
    //         person = element
    //     }
    // });

    if(person) {
        res.json(person)
    }
    else // 예외를 터뜨린다 = http status code 성공 X 실패!
    {
        res.status(404).json({
            message : "전달해주신 id를 가진 구성원은 없습니다."
    })
    }
})