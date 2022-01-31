DROP DATABASE IF EXISTS Employee_tracker;

CREATE DATABASE Emplotee_tracker;

USE employees_DB;

--Makes the tables for databases.--
--DEPARTMENT DATABASE SIDENOTE: I'M STARTITING TO LEARN HOW DATABASES ARE MADE AT MY STORE--
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id));

--ROLE TABLE--

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title TEXT NOT NULL,
salary INTEGER,
department INT NOT NULL,
name VARCHAR(30),
PRIMARY KEY (id)
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


--EMPLOYEE TABLE--

CREATE TABLE employee (
id INT PRIMARY KEY NOT NULL, 
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL, 
role_id INT NOT NULL, 
department VARCHAR(30)
salary INT NOT NULL
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (roles_id) REFERENCES (roles_id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES (employee_id) ON DELETE CASCADE,
FOREIGN KEY (roles_id) REFERENCES salary(roles_salary) ON DELETE CASCADE
FOREIGN KEY (department) REFERENCES department(department_id)
);
