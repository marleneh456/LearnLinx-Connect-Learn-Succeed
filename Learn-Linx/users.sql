#DROP DATABASE IF EXISTS LEARN_LINX;

CREATE DATABASE IF NOT EXISTS LEARN_LINX;

USE LEARN_LINX;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id INT(20),
  username VARCHAR(30),
  name VARCHAR(30),
  password VARCHAR(100),
  email VARCHAR(100) -- Adding email column
);

INSERT INTO Users (id, username, name, password, email) 

VALUES(1, 'marleneh', 'Marlene Habib', '12345', 'marleneh@example.com'),
	  (2, 'bsonarika', 'Sonarika Bhadoria', '12345', 'sonarika@example.com'),
      (3, 'vishal', 'Vishal Sahu', '12345', 'vishal@example.com'),
      (4, 'vijay', 'Vijay mourya', '12345', 'vijay@example.com');
