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
                    addDep();
                    break;
                case "Add an employee":
                    addDep();
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
                    deleteDep();
                    break;
            }
        })
}

function viewDep() {
    let query = "SELECT e.id, e.first_name, e.lastname, e.role_id, e.salary, e.department,"

    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("Sorry, try again!");

        console.table(res);
        menu();
    })
}

function viewRoles() {

    let query = "SELECT roles.id, roles.title, roles.salary, roles.department AS role "
}

function viewEmpl() {
    let query = "SELECT e.id, e.first_name, e.lastname, e.role_id, e.salary, e.department, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    connection.query(query, function(err, res) {
        if(err) return err;
        console.log("Sorry, try again!");

        console.table(res);
        menu();
    })
}

function addDep() {
    let roleArr = [];
    let managerArr = [];

    //make connection using promise-sql
    promisemysql.createConnection(connectionProperties)
    .then((conn) => {return Promise.all([
        conn.query('SELECT id, title FROM role ORDER BY title ASC'),
        conn.query("SELECT employee.id, concat(employee.first_name, ' ', employee.last_name.) AS Employee FROM employee ORDER BY EMPLOYEE ASC")
    ])})
    
    inquirer.prompt({
      name: "department",
      type: "input",
      message: "Add a department please."
    }
    )
    .then((answers) => {
        answers = value;
        for (i = 0; i < values.length; i++){
            addDepQuery.push(value[i].name)
        }
    })
}

function addRole() { }

function addEmpl() {
    deptQuery = value;
    for (i =0; i < values.length; i++){
        deptArr.push(value[i].name)
    }
}

function updateEmpl() { }

function updateManager() { }

function deleteEmpl() {
    let employeeArr = [];

    promisemysql.createConnection(connectionProperties).then((conn) => {
        for (i = 0; i < values.length; i++){
            employeeArr.push(employees[i].employee)
        }
    })
}

function deleteRole() { }

function deleteDep() { }