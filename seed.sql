insert into users
(name)
values
('Carlos'),('Kyle'),('Michael');

insert into adventures
(name)
values
('New York'),('Atlanta'),('Mars');



insert into questions
(question, answer, ord, adventure_id)
values
('what month is it','november',1,1),
('what month is it','december',2,1),
('what month is it','january',3,1),
('what month is it','february',1,2),
('what month is it','march',2,2),
('what month is it','april',3,2);

insert into userQuestions
(user_id,question_id,response)
values
(1,1,'aasdfasd'),
(1,2,'sdfsdfsf'),
(1,3,'asdfasdf');



-- select user_id,response,completed,questions.question,questions.ord, adventures.name from userQuestions
-- join questions 
-- on questions.id = userquestions.question_id
-- join adventures
-- on adventures.id = questions.adventure_id
-- and completed is NULL
-- where user_id = 1
-- order by questions.ord

-- ;