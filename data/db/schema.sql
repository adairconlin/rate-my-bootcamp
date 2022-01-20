-- create database
bootcamp_db;

CREATE TABLE bootcamp (
    bootcamp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    BootcampID VARCHAR(100) NOT NULL,
    BootcampName VARCHAR(100) NOT NULL
);


CREATE TABLE instructor (
    instructor_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    instructorName VARCHAR(100) NOT NULL,
    bootcamp_id INTEGER NOT NULL
);

CREATE TABLE feedback (
    feedback_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    review_text VARCHAR(75)
    instructor_id NULL
    bootcamp_id NULL
    user_id NOT NULL
    rating NOT NULL
);

CREATE TABLE user (
    user_id AUTO_INCREMENT PRIMARY KEY
    username NOT NULL
    email BOOLEAN
    password VARCHAR(8) NOT NULL
);