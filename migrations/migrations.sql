DROP DATABASE IF EXISTS happy_hour_db;
CREATE DATABASE happy_hour_db;
\c happy_hour_db

DROP TABLE IF EXISTS favorite_drinks CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
id BIGSERIAL PRIMARY KEY,
username VARCHAR(255),
email VARCHAR(255),
password VARCHAR(255),
UNIQUE (username)
);

CREATE TABLE favorite_drinks (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(255),
description TEXT,
ingredients TEXT,
image TEXT,
user_id INT REFERENCES users(id)
);
