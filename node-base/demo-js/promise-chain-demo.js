
//비동기 처리 "Promise (Chaining)"
let promise = new Promise(function(resolve, reject) { // 매개변수로 함수를 받아요.
    setTimeout(() => resolve("완료!"), 3000);
}).then(
    function(result){
        console.log(result);
        return result + "!!!!!";
    }, 
    function(error){}
).then(
    function(result){
        console.log(result);
    }, 
    function(error){}
);