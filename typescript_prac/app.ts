//변수의 데이터 타입 명시

let stdId: number = 1111;
let stdName: string = "lee";
let age: number = 20;
let gender: string = "male";
let course: string = "Typescript";
let completed: boolean = false;

enum GenderType {
    Male,
    Female
}

interface IStudent {
  stdId: number;
  stdName?: string;
  age?: number; //선택적 프로퍼티
  gender?: GenderType;
  course?: string;
  completed?: boolean;
  //setName(Name : string) : void;
  setName: (name: string) => void;
//   getName: () => string;
}

class MyStudent implements IStudent {
  stdId = 123;
  stdName = "woo";
  age = 32;
  gender = GenderType.Female;
  course = "java";
  completed = true;

  setName(name: string): void {
    this.stdName = name;
    console.log("이름 설정 : " + this.stdName);
  }
}

const myInstance = new MyStudent();
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
