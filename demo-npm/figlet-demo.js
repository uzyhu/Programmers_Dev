var figlet = require("figlet");

figlet("~UZYHU~", function (err, data) {
    //익명의 함수를 쓰는 이유 = 이 함수를 쓸 일이 다른데는 없어서..
    //근데 왜 함수를 쓰냐? 이걸 만든 사람이, 매개변수로 함수를 받기로 했기 때문

    // 첫번째 매개변수 "Songa"라는 문자열을 받아서,
    // "아스키 아트를 만든 다음에"
    // 두번째 매개변수 function 함수를 실행 = 콜백
    if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});