const conn = require('../mariadb'); //db 모듈
const { StatusCodes } = require('http-status-codes'); //status code 모듈


const allBooks = (req, res) => {
    let { category_id } = req.query; 

    if (category_id) { //카테고리별 도서 목록 조회 (쿼리스트링으로 받을거임)
        let sql = 'SELECT * FROM books WHERE category_id=?';
        conn.query(sql, category_id,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                if (results.length) {
                    return res.status(StatusCodes.OK).json(results);
                }
                else {
                    return res.status(StatusCodes.NOT_FOUND).end();
                }
            })
    }
    else { //전체도서조회, (요약된 전체 도서 조회)
        let sql = 'SELECT * FROM books';
        conn.query(sql,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.OK).json(results);
            })
    }
}

const bookDetail = (req, res) => {//개별도서조회
    let { id } = req.params;

    let sql = 'SELECT * FROM books WHERE id=?';
    conn.query(sql, id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results[0]) {
                return res.status(StatusCodes.OK).json(results[0]);
            }
            else {
                return res.status(StatusCodes.NOT_FOUND).end();
            }
        })
}

module.exports = {
    allBooks,
    bookDetail
}