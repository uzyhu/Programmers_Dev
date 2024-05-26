//express 모듈
const express =  require('express');
const router = express.Router(); //라우팅 당하는 입장

//dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

//좋아요 추가
router.post('/:id', (req,res) => {
    res.json('좋아요 추가');
});

//좋아요 취소
router.delete('/:id', (req,res) => {
    res.json('좋아요 취소');
});

module.exports = router;