-- create database
bootcamp_db;

CREATE TABLE bootcamp (
    bootcamp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    BootcampID STRING NOT NULL,
    BootcampName STRING NOT NULL
);


CREATE TABLE instructor (
    instructor_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    instructorName STRING NOT NULL,
    bootcamp_id INTEGER NOT NULL
);

CREATE TABLE feedback (
    feedback_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    review_text 
    instructor_id NULL
    bootcamp_id NOT NULL
    user_id NOT NULL
    rating NOT NULL
);

CREATE TABLE user (
    user_id AUTO_INCREMENT PRIMARY KEY
    username NOT NULL
    email BOOLEAN
    password VARCHAR(8) NOT NULL
);