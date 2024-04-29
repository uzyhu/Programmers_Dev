const express = require('express');
const app = express();
app.listen(1234);

let db = new Map();

let notebook = {
    productName : "Notebook",
    price : 2000000
}

let cup = {
    productName : "Cup",
    price : 7000
}

let chair = {
    productName : "Chair",
    price : 50000
}

let poster = {
    productName : "Poster",
    price : 40000
}


db.set(1, notebook) //키로 밸류를 찾을 수 있는 한 쌍을 지정
db.set(2, cup)
db.set(3, poster) //표현방식은 : 이 아니라 => 로 다름
db.set(4, chair)

console.log(db);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));

app.get('/:id', function(req, res){
    let {id} = req.params;
    console.log(id); //db에는 숫자로 들어있고 id는 문자열 형태이다.
    id = parseInt(id); //"숫자" => 숫자, json 모든 키값 문자열..
    
    if(db.get(id) == undefined){
        res.json({
            message : "없는 상품입니다."
        })
    }else { //else 필수.. 에러남
        product = db.get(id);
        // product.id = id //객체에 추가하는 방법1
        product["id"] = id;

        res.json(product)
    }
})