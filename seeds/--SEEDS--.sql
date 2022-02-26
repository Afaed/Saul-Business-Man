-- SEEDS --

-- departments values for the departments --
INSERT INTO departments(dept_name)
VALUES ("Produce");

INSERT INTO departments(dept_name)
VALUES ("Meat");

INSERT INTO departments(dept_name)
VALUES ("Front");

INSERT INTO departments(dept_name)
VALUES("Management");

INSERT INTO departments(dept_name)
VALUES("Storehouse");

-- roles values for the roles --
INSERT INTO roles(title, salary, department_id)
VALUES ("Courtesy Clerk", 17, 3 );

INSERT INTO roles(title, salary, department_id)
VALUES("Manager", 20000, 3);

INSERT INTO roles(title, salary, department_id)
VALUES("Assitant Manager", 2, 3);

INSERT INTO roles(title, salary, department_id)
VALUES("Casheier", 21, 3);

INSERT INTO roles(title, salary, department_id)
VALUES ("Reciever", 2540, 5);

INSERT INTO roles(title, salary, department_id)
VALUES ("Butcher", 10000, 2);

INSERT INTO roles(title, salary, department_id)
VALUES ("Produce Worker", 250, 1);

-- Employee Values --

INSERT INTO employees (first_name, last_name, role_id, department_id)
VALUES ("John", "Smith", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, department_id)
VALUES ("Jimmy", "Page", 3, 4);
INSERT INTO employees (first_name, last_name, role_id, department_id)
VALUES ("Paulina", "Pie", 2, 4);
