

function add1(x,y) {
    return x+y
}

let add2 = function (x,y) { //모듈화해서 사용하려고
    return x+y
}

const add3 = (x,y) => { //function 대신에 => 쓰는 느낌
    return x+y
}

var add4 = (x,y) => x+y //바로 리턴내용을..