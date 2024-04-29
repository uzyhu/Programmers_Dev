let http = require('http'); //node js에 이미 완성된 모듈(http)을 갖다 쓰게 해주도록 불러주는 함수

function onRequest(request, response) { //클라이언트한테 요청이 오면 응답을 해줄때
    response.writeHead(200, {'Content-Type' : 'text/html'}); //정상이고, 너에게 줄 type은 html이다.
    response.write('Hello Node.js'); //write뒤에 body생략됨
    response.end(); //응답에 담을거 끝났음. 전송!
}

http.createServer(onRequest).listen(8888); //클라이언트가 8888로 접속해야해! 서버와 클라이언트가 대화하려면 같은 주파수를 맞춰야한다.. 포트번호
    //localhost:8888
//http 모듈에 createServer 함수에서 할일을 다 한 다음에
//onRequest 콜백 함수를 실행시켜달라고 매개변수로 던진 것!
//서버 만들고 onRequest 실행해달라는 소리 