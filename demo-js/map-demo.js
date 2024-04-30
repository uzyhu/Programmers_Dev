// map 함수(메서드) vs foreach 차이


/**
 * 배열
 */

const arr = [1,2,3,4,5]

const mapArr=arr.map(function(a, b, c){
    return a*2
}) 

//콜백함수가 하는 일?
//객체 (또는 배열)에서 요소를 하나 꺼낸 다음 불리는 콜백함수
//매개변수로 그 요소를 전달하여 호출되는 콜백함수
const foreachArr = arr.forEach(function(a, b, c){ //=> foreach는 return을 하지 않음.. 하는 척만 함
    return a*2
})   //일반적으로 콜백함수

console.log(`map으로 return하면 ${mapArr}, foreach로 return하면 ${foreachArr}`)