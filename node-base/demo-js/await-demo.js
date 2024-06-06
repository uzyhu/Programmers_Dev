// async-await : Promise 객체를 좀 더 쉽고 편하게 사용 문법
// 즉, 비동기 처리가 쉽다!

// await은 async 함수 안에서만 동작!
// await이.. Promise 객체.then() 이 메소드를 좀 더 쉽게 사용할 수 있는 방법

//async의 두 번째 기능
// Promise 객체가 일이 끝날 떄까지 기다릴 수 있는 공간을 제공한다.
async function f() {
    let promise1 = new Promise(function(resolve, reject){
        setTimeout(() => resolve("첫!"), 3000);
    });

    let result1 = await promise1;
    // promise 객체가 일 다 할 때까지 기다려줌
    console.log(result1);

    let promise2 = new Promise(function(resolve, reject){
        setTimeout(() => resolve("둘!" + result1), 3000);
    });

    let result2 = await promise2;
    // promise 객체가 일 다 할 때까지 기다려줌
    console.log(result2);

    let promise3 = new Promise(function(resolve, reject){
        setTimeout(() => resolve("셋!" + result2), 3000);
    });

    let result3 = await promise3;
    // promise 객체가 일 다 할 때까지 기다려줌
    console.log(result3);
}

f();