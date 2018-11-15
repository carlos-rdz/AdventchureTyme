create table users
(id serial primary key,
name text,
phonenumber text
);

create table adventures
(id serial primary key,
name text,
creator integer references users (id) on delete cascade,
picture text
);

create table questions
(id serial primary key,
question text,
answer text,
ord integer,
adventure_id integer references adventures (id) on delete cascade
);

create table userQuestions
(id serial primary key,
user_id integer references users (id) on delete cascade,
question_id integer references questions (id) on delete cascade,
response text,
completed bool
);
