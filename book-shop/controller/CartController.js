const jwt = require('jsonwebtoken');
const conn = require('../mariadb'); //db 모듈
const { StatusCodes } = require('http-status-codes'); //status code 모듈
const dotenv = require('dotenv'); //dotenv 모듈
dotenv.config();

//장바구니 담기 
const addToCart = (req, res) => {
    const { book_id, quantity } = req.body;

    let authorization = ensureAuthorization(req, res);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인하세요."
        })
    } else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        })
    } else {
    let sql = 'INSERT INTO cartItems (book_id, quantity, user_id) values (?, ?, ?)';
    let values = [book_id, quantity, authorization.id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })}
};

//장바구니 아이템 목록 조회 + 장바구니에서 선택한 주문 "예상" 상품 목록 조회
const getCartItems = (req, res) => {
    const { selected } = req.body;

    let authorization = ensureAuthorization(req, res);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인하세요."
        })
    } else if(authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        })
    } else {
    let sql = "SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON books.id = cartItems.book_id WHERE cartItems.user_id = ? AND cartItems.id IN (?)"
    let values = [authorization.id, selected];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })}
};

//장바구니 아이템 제거
const removeCartItem = (req, res) => {
    const cartItemId = req.params.id; //cartItem id

    let sql = "DELETE FROM cartItems WHERE id = ?";
    conn.query(sql, cartItemId,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        })
}

function ensureAuthorization(req, res) {
    try {
        let receivedJWT = req.headers["authorization"];
        console.log("received jwt : ", receivedJWT);

        let decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);
        console.log(decodedJWT);

        return decodedJWT;
    } catch (err) {
        console.log(err.name);
        console.log(err.message);

        return err;
    }

}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}