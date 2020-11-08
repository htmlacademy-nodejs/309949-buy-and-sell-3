CREATE DATABASE buyandsell
    WITH
    OWNER = buyandsell
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE buyandsell TO buyandsell;

DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(100),
    created_at DATE,
    updated_at DATE,
    deleted_at DATE
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    picture VARCHAR(100),
    type VARCHAR(50) NOT NULL,
    sum INTEGER NOT NULL,
    author_id INTEGER,
    created_at DATE,
    updated_at DATE,
    deleted_at DATE,
    FOREIGN KEY (author_id) REFERENCES users (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

CREATE INDEX idx_offer_title ON offers(title);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INTEGER,
    offer_id INTEGER,
    created_at DATE,
    updated_at DATE,
    deleted_at DATE,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    FOREIGN KEY (offer_id) REFERENCES offers (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at DATE,
    updated_at DATE,
    deleted_at DATE
);

CREATE TABLE categories_offers (
    category_id INTEGER NOT NULL,
    offer_id INTEGER NOT NULL,
    CONSTRAINT categories_offers_pk PRIMARY KEY (category_id, offer_id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (offer_id) REFERENCES offers (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
