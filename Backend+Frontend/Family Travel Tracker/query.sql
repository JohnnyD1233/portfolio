DROP TABLE IF EXISTS visited_countries, users ,countries;

CREATE TABLE countries (
	id SERIAL PRIMARY KEY ,
	country_code CHAR(2) NOT NULL,
	country_name TEXT NOT NULL
)

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name TEXT UNIQUE NOT NULL,
color TEXT
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (name, color)
VALUES ('Yonatan', 'teal'), ('Moria', 'powderblue');

INSERT INTO visited_countries (country_code, user_id)
VALUES ('IL', 1),('IL', 2);

SELECT *
FROM visited_countries
JOIN users
ON users.id = user_id;