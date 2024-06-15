const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();

app.listen(5555);
//localhost:5555/fake/users
//한 명의 사용자 정보 생성
//email, password, fullName, contact
//req로 숫자를 받아서, 그 수 만큼 사용자 정보를 생성해주는 api

app.get('/fake/users/:id', function (req, res) {
    const {num} = req.query;

    let index = 1; //while문을 위한 index
    let users = [];
    while (index <= num) {
        users.push({
            email: faker.internet.email(),
            password: faker.internet.password(),
            fullName: faker.person.fullName(),
            contact: faker.phone.number()
        })
        i++;
    }
    res.status(200).json(users);
})

console.log(faker.internet.userName());
console.log(faker.internet.email());
console.log(faker.internet.password());