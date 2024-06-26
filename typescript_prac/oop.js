//멤버변수 == 속성 == 프로퍼티
//멤버함수 == 메소드
var Employee = /** @class */ (function () {
    function Employee(_empName, _age, _empJob //암묵적 멤버 변수 선언 그와 동시에 전달인자로 사용
    ) {
        var _this = this;
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
        this.printEmp = function () {
            console.log("".concat(_this._empName, "\uC758 \uB098\uC774\uB294 ").concat(_this._age, ", \uC9C1\uC5C5\uC740 ").concat(_this.empJob));
        };
    }
    Object.defineProperty(Employee.prototype, "empName", {
        //get/set 함수
        get: function () {
            return this._empName;
        },
        set: function (val) {
            this._empName = val;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee1 = new Employee('woo', 20, 'enginner');
employee1.empName = 'kyu'; //set함수 호출
employee1.printEmp();
