INSERT INTO likes (user_id, liked_book_id) VALUES (1,0);
INSERT INTO likes (user_id, liked_book_id) VALUES (1,4);
INSERT INTO likes (user_id, liked_book_id) VALUES (1,6);
INSERT INTO likes (user_id, liked_book_id) VALUES (2,3);
INSERT INTO likes (user_id, liked_book_id) VALUES (2,7);
INSERT INTO likes (user_id, liked_book_id) VALUES (5,8);
INSERT INTO likes (user_id, liked_book_id) VALUES (5,3);
INSERT INTO likes (user_id, liked_book_id) VALUES (8,4);
INSERT INTO likes (user_id, liked_book_id) VALUES (9,1);
INSERT INTO likes (user_id, liked_book_id) VALUES (9,2);
INSERT INTO likes (user_id, liked_book_id) VALUES (10,5);

SELECT *,
    (SELECT EXISTS (SELECT * FROM likes WHERE user_id = 1 AND liked_book_id = 3)) AS liked,
    (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes
    FROM books WHERE books.id=1;



// 장바구니 담기
INSERT INTO cartItems (book_id, quantity, user_id) VALUES (1,1,1)

// 장바구니 조회
SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON books.id = cartItems.book_id;

// 장바구니에서 선택한(장바구니 도서 id) 아이템 목록 조회
SELECT * FROM cartItems WHERE user_id=1 AND id IN (1,3)