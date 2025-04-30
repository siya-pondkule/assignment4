create database assignment_4;
use assignment_4;

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    option4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    image_url VARCHAR(255)
);

select * from questions;

CREATE TABLE IF NOT EXISTS student_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    score INT NOT NULL
);
select * from student_scores;

select * from users;