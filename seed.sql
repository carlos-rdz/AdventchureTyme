insert into users
(name,phonenumber)
values
('Carlos','4564564563'),('Kyle','3456789706'),('Michael','4562340695');

insert into adventures
(name)
values
('New York'),('Atlanta'),('Mars');



insert into questions
(question, answer, ord, adventure_id)
values
('what month is it','december',2,1),
('what month is it','january',3,1),
('what month is it','february',1,2),
('what month is it','march',2,2),
('what month is it','april',3,2),
('what month is it','february',1,3),
('what month is it','march',2,3),
('what month is it','april',3,3);
('While many wooden overpasses exist in and around Marietta, this one one the square is of the rock variety. It is most trafficked on Sundays....','Stonebridge',2,1),
('The square has an extra "avenue" on it. Best if you take Fido along with you.','Bark Street',2,1),
('Cobb County was created Dec. 3, 1832. Find this historical marker to learn how the city of Marietta was named.','Cobb County',2,1),
('While not the only one of these on the square it has "cornered" the market on expensive metals.','Hamilton Jewelers',2,1),
('This shop specalizes in effervescence. Small ones...I hear the flavored tapioca add-ins are tasty if that is your cup of tea.','Tiny Bubbles',2,1),
('This historic hotel served soldiers and civilians in the 1860s. It is best known as the staging point for the Great Locomotive Chase. Find this plaque outside the hotel.','Kennesaw House',2,1),
('Glover Machine Works has a long history in Georgia. This locomotive was restored in 1992, find its engine number.','81421',2,1),
('Not to be confused with the nearby "squiggly insects", this "reptile" likes his sweets.','Lizards',2,1),
('5 big and red of these will lead you to a great meal.','Stockyard',2,1),
('This "Monument" on the Square premiered with Top Hat starring Fred Astaire and Ginger Rogers.','Strand',2,1),

-- insert into userQuestions
-- (user_id,question_id,response)
-- values
-- (1,1,'aasdfasd'),
-- (1,2,'sdfsdfsf'),
-- (1,3,'asdfasdf');



-- select user_id,response,completed,questions.question,questions.ord, adventures.name from userQuestions
-- join questions 
-- on questions.id = userquestions.question_id
-- join adventures
-- on adventures.id = questions.adventure_id
-- and completed is NULL
-- where user_id = 1
-- order by questions.ord

-- ;