//express 모듈
const express =  require('express');
const router = express.Router(); //라우팅 당하는 입장

//dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

//전체 도서 조회
router.get('/', (req,res) => {
    res.json('전체 도서 조회');
});

//개별 도서 조회
router.get('/:id', (req,res) => {
    res.json('개별 도서 조회');
});

//카테고리별 도서 목록 조회
router.get('/:id', (req,res) => {
    res.json('카테고리별 도서 목록 조회');
});

//카테고리별 도서 목록 조회 + 신간
router.delete('/', (req,res) => {
    res.json('카테고리별 도서 목록 조회 + 신간');
});

module.exports = router;