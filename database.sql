CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(80) UNIQUE NOT NULL,
    password varchar(100) NOT NULL
);

CREATE TABLE flowers (
    id SERIAL PRIMARY KEY,
    title varchar(80),
    url varchar(100) NOT NULL UNIQUE,
    description varchar(120) NOT NULL,
    credit varchar(80)
);

CREATE TABLE user_flowers (
    id SERIAL PRIMARY KEY,
    flower_id integer REFERENCES flowers,
    user_id integer REFERENCES users,
    quantity integer
);
