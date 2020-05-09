DROP DATABASE IF EXISTS cmsDB;
CREATE DATABASE cmsDB;

USE cmsDB;

CREATE TABLE department (
    id INT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE employee ()