//변수의 데이터 타입 명시
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
        this.gender = GenderType.Female;
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
myInstance.setName('zizi');
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
