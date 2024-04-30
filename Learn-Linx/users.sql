--users.sql

--This is where it load all the users infomation

#DROP DATABASE IF EXISTS LEARN_LINX;

CREATE DATABASE IF NOT EXISTS LEARN_LINX;

USE LEARN_LINX;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  username VARCHAR(30),
  name VARCHAR(30),
  password VARCHAR(100),
  email VARCHAR(100)
);

INSERT INTO Users (username, name, password, email) 

VALUES('marleneh', 'Marlene Habib', 'Pass12345', 'MarleneH@example.com'),
	  ( 'johnnydoes', 'John Doe', 'Pass12345', 'JohnDoe@example.com'),
      ( 'lillyPaddie', 'Lilly Pad', 'Pass12345', 'LillyPad@example.com'),
      ( 'AlexMarching', 'Alex March', 'Pass12345', 'AlexM@example.com');
