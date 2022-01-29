--SEEDS--

--department values for the department--
INSERT INTO department(id, name)
VALUES (1, "Produce");

INSERT INTO department(id, name)
VALUES (2, "Meat");

INSERT INTO department(id, name)
VALUES (3, "Front");

INSERT INTO department(id, name)
VALUES(4, "Management")

INSERT INTO department(id, name)
VALUES(5, "Storehouse");

--roles values for the roles--
INSERT INTO roles(id, title, salary, department)
VALUES (1, "Courtesy Clerk", 17, 3 );

INSERT INTO roles(id, title, salary, department)
VALUES(2, "Manager", 20000, 3);

INSERT INTO roles(id, title, salary, department)
VALUES(3, "Assitant Manager", 3);

INSERT INTO roles(id, title, salary, department)
VALUES(4, "Casheier" 21, 3);

INSERT INTO roles(id, title, salary, department)
VALUES (5, "Reciever", 2540, 5);

INSERT INTO roles(id, title, salary, department)
VALUES (6, "Butcher", 10000, 2);

INSERT INTO department(id, title, salary, department)
VALUES (1, "Produce Worker", 250, 1);

--Employee Values--

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, NULL)
