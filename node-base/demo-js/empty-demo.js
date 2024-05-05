const obj1 = {}
const obj2 = {hello : "하이"}
const str1 = "hi"
const str2 = "" //문자열도 객체입니다~

console.log(isEmpty(obj1)) //length === 0
console.log(Object.keys(obj2).length === 0) //length === 1

console.log(Object.keys(str1).length === 0)
console.log(Object.keys(str2).length === 0)

function isEmpty(obj) {
    if(obj.constructor === Object) //전해온 변수가 오브젝트인지 확인!!!!
    if(Object.keys(obj).length === 0 ){
        return true
    } else {
        return false
    }
}