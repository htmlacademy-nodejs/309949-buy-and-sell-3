SELECT id, name FROM categories;

SELECT id, name FROM categories
JOIN categories_offers ON id = category_id
GROUP BY id;

SELECT id, name, COUNT(offer_id) FROM categories
LEFT JOIN categories_offers ON id = category_id
GROUP BY id;

SELECT offers.*,
    COUNT(comments.id) AS comments_count,
    STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
    users.name,
    users.email
FROM offers
JOIN categories_offers ON offers.id = categories_offers.offer_id
JOIN categories ON categories_offers.category_id = categories.id
LEFT JOIN comments ON comments.offer_id = offers.id
JOIN users ON users.id = offers.author_id
GROUP BY offers.id, offers.created_at, users.id
ORDER BY offers.created_at DESC;

SELECT offers.*,
    COUNT(comments.id) AS comments_count,
    STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
    users.name,
    users.email
FROM offers
JOIN categories_offers ON offers.id = categories_offers.offer_id
JOIN categories ON categories_offers.category_id = categories.id
LEFT JOIN comments ON comments.offer_id = offers.id
JOIN users ON users.id = offers.author_id
WHERE offers.id = 1
GROUP BY offers.id, users.id;

SELECT
    comments.id,
    comments.offer_id,
    users.name,
    comments.text
FROM comments
JOIN users ON comments.user_id = users.id
ORDER BY comments.created_at DESC
LIMIT 5;

SELECT
    comments.id,
    comments.offer_id,
    users.name,
    comments.text
FROM comments
JOIN users ON comments.user_id = users.id
WHERE comments.offer_id = 1
ORDER BY comments.created_at DESC;

SELECT * FROM offers
WHERE type = 'buy'
LIMIT 2;

UPDATE offers
SET title = 'Уникальное предложение!'
WHERE id = 1;
