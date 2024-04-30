
/**
 * 배열
 */

const arr = [1,2,3,4,5]

//콜백함수가 하는 일?
//객체 (또는 배열)에서 요소를 하나 꺼낸 다음 불리는 콜백함수
//매개변수로 그 요소를 전달하여 호출되는 콜백함수
arr.forEach(function(a, b, c){
    // console.log(`a:${a}, b: ${b}, c: ${c}`) //a값은 데이터값, b값은 인덱스
})   //일반적으로 콜백함수


//Map과 foreach의 만남
let map = new Map()
map.set(1, "one")
map.set(2, "two")
map.set(3, "three")

map.forEach(function(a, b, c){
    console.log(`a: ${a}, b: ${b}, c: ${c}`)
})

