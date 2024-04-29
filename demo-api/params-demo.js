const express = require('express')
const app = express() //서버를 담았다

app.get('/products/:n', function(req,res) {
    // : => 어? 나한테 url로 매개변수를 전달해줄 건 가보다, 근데 어떤 변수인지는 모름
    //products/_ 빈칸에 오는 값을 n이라는 변수에 담아줘
    let number = parseInt(req.params.n) -10 //문자로 된 숫자를 숫자로 취급해줌.but parseInt로 숫자로 변환.
    
    res.json({
        num : number //전달받은 숫자가 문자열로 전달됨
    })
})

//서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234); //위치바껴도 상관없음.

// app.get('/:nickname', function(req,res) {
//     const param = req.params

//     res.json({
//         channel : param.nickname
//     })
// })

//시청 클릭 주소 : https://www.youtube.com/watch?v=2YLs33C72zo&t=291s 쿼리(?,질문을 한다.)스트링으로 파라미터를 받는다.
app.get('/watch', function(req,res) {
    // const q = req.query; //q = {v:_. t:_}
    // console.log({
    //     영상코드 : q.v,
    //     시작지점 : q.t
    // });

    // js객체(JSON)의 비구조화 .. 변수이름을 맞춰줘야한다.
    console.log(req.query);
    const {v, t} = req.query; //변수이름은 그대로 키값을 사용해줘야함.
    console.log(v);
    console.log(t);
    res.json({
        video : v,
        timeline : t
    })
})
