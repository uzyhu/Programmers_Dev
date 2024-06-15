function foo() { //함수 선언문
    console.log('foo');
}

foo();

const foo2 = function () { //함수 표현식
    console.log('foo2');
}

foo2();

const foo3 = new Function("console.log('foo3')");

foo3();

const foo4 = () => {
    console.log('foo4');
}

foo4();

(function foo5() { //IIFE (즉시 실행 함수)
    console.log('foo5');
})();

function foo6(arg) { //재귀함수
    if(arg === 3) return;
    console.log(arg);
    foo6(arg + 1);
}

foo6(1);

function foo7(arg) { //중첩함수
    function bar() {
        console.log(arg);
    }
    bar();
}

foo7('hi!');

function foo8(arg) { //콜백함수
    arg();
}

foo8(() => {
    console.log(1);
})