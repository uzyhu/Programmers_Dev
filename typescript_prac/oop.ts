//멤버변수 == 속성 == 프로퍼티
//멤버함수 == 메소드
class Employee {

  constructor(
    private _empName : string, 
    private _age : number, 
    private _empJob : string //암묵적 멤버 변수 선언 그와 동시에 전달인자로 사용
    ) { //앞이 옵션이면 그 이하는 모두 옵션

  }

  //get/set 함수
  get empName() {
    return this._empName;
  }

  set empName(val : string) {
    this._empName = val;
  }

  printEmp = (): void => {
    console.log(`${this._empName}의 나이는 ${this._age}, 직업은 ${this.empJob}`);
  };
}

let employee1 = new Employee('woo', 20, 'enginner');
employee1.empName = 'kyu'; //set함수 호출
employee1.printEmp();