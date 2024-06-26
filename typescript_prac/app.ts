//변수의 데이터 타입 명시

let stdId: number = 1111;
let stdName: string = "lee";
let age: number = 20;
let gender: string = "male";
let course: string = "Typescript";
let completed: boolean = false;

enum GenderType {
  Male,
  Female,
}

interface IStudent {
  stdId: number;
  stdName?: string;
  age?: number; //선택적 프로퍼티
  gender?: "male" | "female";
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
  gender: "male" | "female" = "male";
  course = "java";
  completed = true;

  setName(name: string): void {
    this.stdName = name;
    console.log("이름 설정 : " + this.stdName);
  }
}

const myInstance = new MyStudent();
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

const user: { name: string; age: number } = {
  name: "john",
  age: 25,
};

type strOrNum = number | string;

let numStr: strOrNum = "100";
let item: number;

function convertToString(val: strOrNum): string {
  if (typeof val === "string") {
    item = 0;
  } else {
    item = val;
  }
  //typeof operator
  return String(val); //String으로 변환
}

function convertToNumber(val: strOrNum): number {
  return Number(val); //Number로 변환
}

console.log(convertToNumber(100));
console.log(convertToString(100));

console.log(convertToNumber("100"));
console.log(convertToString("100"));

let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

//배열의 유니온 타입
let mixedArray: (number | string)[] = [1, "two", 3, "four"];

for (let i = 0; i < mixedArray.length; i++) {
  console.log(mixedArray[i]);
}

let infer = [1, 2, 3]; //타입추론

let readOnlyArray: ReadonlyArray<number> = [1, 2, 3];

//튜플 : 타입의 순서가 정해져 있다.
let greeting: [number, string, boolean] = [1, "hello", true];

for (let i = 0; i < greeting.length; i++) {
  console.log(greeting[i]);
}

//Spread 연산자 : 괄호를 벗겨준다
let firstArray = [1, 2, 3];
let secondArray = [4, 5, 6];

let combinedArray = [...firstArray, ...secondArray];

for (let i = 0; i < combinedArray.length; i++) {
  console.log(combinedArray[i]);
}
