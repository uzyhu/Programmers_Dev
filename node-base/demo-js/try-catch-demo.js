// let string = '{"num1":1}';

// try {
//     let json = JSON.parse(string);
//     console.log(json.name) //js 입장에선 에러가 아니지만, 우리 입장에선 에러! = 입력값이 잘못된 에러
// }
// catch (err) {
//     console.log(err.name);
//     console.log(err.message);

//     console.log(err);
// }

//----------------------------------------------------

try {
    username;
} catch (err) {
    console.log("username이 선언되지 않았습니다.");
    console.log("발생한 에러는 다음과 같습니다.");
    console.log(err.name);
    console.log(err.message);
}

// username
// if() ?????