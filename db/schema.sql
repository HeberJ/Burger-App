CREATE DATABASE burgers_db;
USE burgers_db;


DROP TABLE IF EXISTS burgers;

CREATE TABLE burgers (
  id int(11) AUTO_INCREMENT NOT NULL,
  burger_name varchar(255) NOT NULL,
  devoured BOOL DEFAULT false,
  PRIMARY KEY (id)
);