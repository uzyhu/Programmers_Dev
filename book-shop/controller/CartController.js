const conn = require('../mariadb'); //db 모듈
const { StatusCodes } = require('http-status-codes'); //status code 모듈

//장바구니 담기 
const addToCart = (req, res) => {
    const {book_id, quantity, user_id} = req.body;
    let sql = 'INSERT INTO cartItems (book_id, quantity, user_id) values (?, ?, ?)';
    let values = [book_id, quantity, user_id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })
};

//장바구니 아이템 목록 조회 + 장바구니에서 선택한 주문 "예상" 상품 목록 조회
const getCartItems = (req, res) => {
    const {user_id, selected} = req.body;
    
    let sql = "SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON books.id = cartItems.book_id WHERE cartItems.user_id = ? AND cartItems.id IN (?)"
    let values = [user_id, selected];
    conn.query(sql, values, (err,results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};

//장바구니 아이템 제거
const removeCartItem = (req, res) => {
    const {id} = req.params; //cartItem id

    let sql = "DELETE FROM cartItems WHERE id = ?";
    conn.query(sql, id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}