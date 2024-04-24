#DROP DATABASE IF EXISTS learn_linx

CREATE DATABASE IF NOT EXISTS learn_linx;

USE learn_linx;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  `id` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Users (`id`, `username`, `name`, `password`, `email`) VALUES
(1, 'marleneh', 'Marlene Habib', '12345', 'marlenehabib@email.com'),
(2, 'lillypad', 'Lilly Pad', '12345', 'lillypad@email.com'),
(3, 'vishal', 'Vishal Sahu', '12345', 'vishalsahu@email.com'),
(4, 'vijay', 'Vijay mourya', '12345', 'vijaymourya@email.com');
