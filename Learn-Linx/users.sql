#DROP DATABASE IF EXISTS LEARN_LINX;

CREATE DATABASE IF NOT EXISTS LEARN_LINX;

USE LEARN_LINX;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  username VARCHAR(30),
  name VARCHAR(30),
  password VARCHAR(100),
  email VARCHAR(100) -- Adding email column
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Users (username, name, password, email) 

VALUES('marleneh', 'Marlene Habib', 'Pass12345', 'MarleneH@example.com'),
	( 'johnnydoes', 'John Doe', 'Pass12345', 'JohnDoe@example.com'),
      ( 'lillyPaddie', 'Lilly', 'Pass12345', 'LillyPad@example.com'),
      ( 'AlexMarching', 'Alex March', 'Pass12345', 'AlexM@example.com');
