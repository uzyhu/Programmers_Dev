//자바스크립트 배열 비구조화

const array = [1, 2, 3, 4, 5];
const [ , num2, num3, , num5] = array; //출력하면 1 2 3 따옴표 후 2 3 5 나옴.. 깔끔하게 변수 대입할수 있음 따로따로 호출 안해도 됨.

const num1 = array[0];
const num4 = array[3];

console.log(num1);
console.log(num4);