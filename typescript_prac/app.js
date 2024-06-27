//변수의 데이터 타입 명시
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var stdId = 1111;
var stdName = "lee";
var age = 20;
var gender = "male";
var course = "Typescript";
var completed = false;
var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType || (GenderType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 123;
        this.stdName = "woo";
        this.age = 32;
        this.gender = "male";
        this.course = "java";
        this.completed = true;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log("이름 설정 : " + this.stdName);
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName("zizi");
// function getInfo(id: number): iStudent {
//   return {
//     stdId: id,
//     stdName: "woo",
//     age: 22,
//     gender: GenderType.Male,
//     course: "javascript",
//     completed: true,
//   };
// }
// let std = {
//   stdId: 123,
//   stdName: "woo",
//   age: 32,
//   gender: GenderType.Male,
//   course: "java",
//   completed: true,
// };
// function setInfo(student: iStudent): void {
//   console.log(student);
// }
// setInfo(std);
// console.log(getInfo(1234));
// //함수의 데이터 타입 명시(매개변수, 리턴타입)
// function plus(a : number, b? : number) : void {
//     return a+b;
// }
var user = {
    name: "john",
    age: 25,
};
var numStr = "100";
numStr = 100;
var item;
function convertToString(val) {
    if (typeof val === "string") {
        item = 0;
    }
    else {
        item = val;
    }
    //typeof operator
    return String(val); //String으로 변환
}
function convertToNumber(val) {
    return Number(val); //Number로 변환
}
console.log(convertToNumber(100));
console.log(convertToString(100));
console.log(convertToNumber("100"));
console.log(convertToString("100"));
var numbers = [1, 2, 3, 4, 5];
var fruits = ["apple", "banana", "orange"];
for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
for (var i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
//배열의 유니온 타입
var mixedArray = [1, "two", 3, "four"];
for (var i = 0; i < mixedArray.length; i++) {
    console.log(mixedArray[i]);
}
var infer = [1, 2, 3]; //타입추론
var readOnlyArray = [1, 2, 3];
//튜플 : 타입의 순서가 정해져 있다.
var greeting = [1, "hello", true];
for (var i = 0; i < greeting.length; i++) {
    console.log(greeting[i]);
}
//Spread 연산자 : 괄호를 벗겨준다
var firstArray = [1, 2, 3];
var secondArray = [4, 5, 6];
var combinedArray = __spreadArray(__spreadArray([], firstArray, true), secondArray, true);
for (var i = 0; i < combinedArray.length; i++) {
    console.log(combinedArray[i]);
}
