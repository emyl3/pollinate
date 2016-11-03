CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(80) UNIQUE NOT NULL,
    password varchar(100) NOT NULL,
    admin boolean DEFAULT false
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
    quantity integer NOT NULL
);

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    question varchar(80)
);

CREATE TABLE user_responses (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users,
    prompt_id integer REFERENCES prompts,
    response varchar(120) NOT NULL,
    used boolean DEFAULT false
);

CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users,
    max integer NOT NULL,
    current integer NOT NULL
);
