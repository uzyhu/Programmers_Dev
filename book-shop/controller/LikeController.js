const conn = require('../mariadb'); //db 모듈
const { StatusCodes } = require('http-status-codes'); //status code 모듈

const addLike = (req,res) => {
    //좋아요 추가

    const {id} = req.params; //좋아요 되는 책 아이디
    const {user_id} = req.body;

    let sql = 'INSERT INTO likes (user_id, liked_book_id) values (?, ?)';
    let values = [user_id, id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })
}

const removeLike = (req, res) => { //좋아요 취소
    const {id} = req.params; //좋아요 되는 책 아이디
    const {user_id} = req.body;

    let sql = "DELETE FROM likes WHERE liked_book_id = ? AND user_id = ?";
    let values = [id, user_id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })
}

module.exports = {
    addLike,
    removeLike
}