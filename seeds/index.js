//Index.js//
const mysql = require("mysql")
var inquirer = require('inquirer')
const fs = require('fs')
const promisemysql = require("promise-mysql")
const { values } = require("lodash")
const { throwError } = require("rxjs")

const connectionProperties = {
    host: "localhost",
    port: 3001,
    user: "root",
    password: "password",
    database: "employees_DB"
}
//Make Connections//

const connection = mysql.createConnection(connectionProperties);

connection.connect((err) => {
    if (err) throw err;

    // Initiate main menu.

    console.log("Welcome to Department Manager v1.0.0")
    menu();
})

function menu() {
    inquirer
        .prompt({
            type: "action",
            name: "choices",
            message: "Welcome! This is the menu. Please pick an option.",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Update Manager",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View employee Salary"
            ]
        })
        .then((answer) => {
            switch (answer.aciton) {
                case "View all departments":
                    viewDep();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmpl();
                    break;
                case "Add a department":
                    addDept();
                    break;
                case "Add an employee":
                    addEmpl();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Update an employee role":
                    updateEmpl();
                    break;
                case "Update Manager":
                    updateManager();
                    break;
                case "Delete employee":
                    deleteEmpl();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete department":
                    deleteDept();
                    break;
            }
        })
}

function viewDep() {
    let query = "SELECT e.id, e.first_name, e.lastname, e.role_id, e.salary, e.department,"

    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("Sorry, try again!");

        console.table(res);
        menu();
    })
}

function viewRoles() {

    let query = "SELECT roles.id, roles.title, roles.salary, roles.department AS role from roles"

    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("Sorry, try again!");

        console.table(res);
        menu();
    })
}

function viewEmpl() {
    let query = "SELECT e.id, e.first_name, e.lastname, e.role_id, e.salary, e.department, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("Sorry, try again!");

        console.table(res);
        menu();
    })
}

function addEmpl() {
    let roleArr = [];
    let managerArr = [];

    //make connection using promise-sql
    promisemysql.createConnection(connectionProperties)
        .then((conn) => {
            return Promise.all([
                conn.query('SELECT id, title FROM role ORDER BY title ASC'),
                conn.query("SELECT employee.id, concat(employee.first_name, ' ', employee.last_name.) AS Employee FROM employee ORDER BY EMPLOYEE ASC")
            ])
        }).then(([roles, managers]) => {
            for (i = 0; i < roles.length; i++) {
                roleArr.push(roles[i].title);
            }

            // place all managers in array
            for (i = 0; i < managers.length; i++) {
                managerArr.push(managers[i].Employee);
            }

            return Promise.all([roles, managers]);
        }).then(([roles, managers]) => {
            managerArr.unshift
            inquirer.prompt({
                name: "firstName",
                type: "input",
                message: "What is the employees name?",
                //check to make sure its not blank
                validate: function (input) {
                    if (input === "") {
                        console.log("Please insert a name.")
                        return false
                    }
                    else { return true }
                }
            },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the Employee's Last name?",
                    validate: function (input) {
                        if (input === "") {
                            console.log("Please insert a name.")
                            return false
                        }
                        else { return true }
                    }
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is this employee's role?",
                    choices: roleArr,
                    validate: function (input) {
                        if (input === "") {
                            console.log("What is their role? They can not have no role.")
                        } else { return true }
                    }
                },
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                    if (err) return err;

                    // Confirm employee has been added
                    console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                    mainMenu();
                })
            )
        }
        )
}

function addRole() {
    let departmentArr = [];

    promisemysql.createConnection(connectionProperties)
        .then((conn) => {
            return conn.query(`SELECT id, name FROM department ORDER BY name ASC`);
        }).then((departments) => {

            inquirer.prompt([
                //Role prompts for title, salary, 
                {
                    name: "title",
                    type: "input",
                    message: "What is the Employees Role?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the employees salary?"
                },
                {
                    name: "dept",
                    type: "list",
                    message: "What department is this role under?",
                    choices: departmentArr,
                },
            ]).then((answer) => {
                //create a department id variable to connect it to the department database

                let deptId;
                
                //for loop to establish it.
                
                for (i = 0; i < departments.length; i++)
                {if(answer.dept = departments[i].id)
                    {
                        deptId = departments[i].id
                    } 
                }
                //now we need to connect it to the table!
                connection.query(
                    `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${answer.dept}")`
                )
                if(err) return err;
                console.log(` \n ROLE ${answer.title} added \n`)
                menu();
            })
        })
};

function addDept() {
    inquirer.prompt([
        //prompts department name
        {
            name: "deptName",
            type: "input",
            message: "What is the department name?"
        }
    ])
    .then((answer) => {
        connection.query(
            `INSERT INTO department (name) VALUES ("${answer.deptName}")`,
            (err, res) => {
                if (err) return err;
                console.log("\n Department added! \n")
                menu();
            }
        )
    }) 
}

function updateEmpl() {
    let roleArr = [];
    let emplpoyeeArr = [];

    promisemysql.createConnection(connectionProperties)
    .then((conn) => {
        return Promise.all([
            conn.query (`SELECT id, title FROM roles ORDER BY title ASC`),
            conn.query ("SELECT employee.id, concat(employee.first_name, ' ', employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }).then(([roles, employees]) => {
        for (i = 0; i < roles.length; i++){
            roleArr.push(roles[i].title);
        }
        for (i = 0; i < employees.length; i++){
            employees.push (employees[i].Employee);
        }

        return Promise.all(([roles, employees]) =>
        {
            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Who do you want to edit?",
                    choices: emplpoyeeArr
                },
                {
                    name: "roles",
                    type: "choices",
                    message: "What is their new role?",
                    choices: roleArr
                },
            ]).then((answer) => {
                let roleID;
                let employeeID;

                for(i = 0; i < roles.length; i++){
                    if (answer.role === roles[i].title){
                        roleID === roles[i].id;
                    }
                }
                for (i = 0; i < employees.length; i++){
                    if (answer.employee === employees[i].employee){
                        employeeID === employees[i].id;
                    }
                }
            })
        });
    })
}

function updateManager() { }

function deleteEmpl() {
    let employeeArr = [];

    promisemysql.createConnection(connectionProperties).then((conn) => {
        for (i = 0; i < values.length; i++) {
            employeeArr.push(employees[i].employee)
        }
    })
}

function deleteRole() { }

function deleteDept() { }