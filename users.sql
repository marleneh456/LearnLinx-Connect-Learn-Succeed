#DROP DATABASE IF EXISTS learn_linx;

CREATE DATABASE IF NOT EXISTS learn_linx;

USE learn_linx;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  `id` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL -- Adding email column
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Users (`id`, `username`, `name`, `password`, `email`) VALUES
(1, 'yssyogesh', 'Yogesh Singh', '12345', 'yogesh@example.com'),
(2, 'bsonarika', 'Sonarika Bhadoria', '12345', 'sonarika@example.com'),
(3, 'vishal', 'Vishal Sahu', '12345', 'vishal@example.com'),
(4, 'vijay', 'Vijay mourya', '12345', 'vijay@example.com');
