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
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES department (id) 
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES role (id),

    FOREIGN KEY (manager_id)
        REFERENCES employee (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;