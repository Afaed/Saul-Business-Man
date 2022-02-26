//Index.js//
const mysql = require("mysql")
var inquirer = require('inquirer')
const promisemysql = require("promise-mysql")
require('dotenv').config()
const { title } = require("process")

const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "test123",
    database: "Employee_tracker",
    insecureAuth: true
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
            type: "list",
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
                "Delete employee",
                "Delete role",
                "Delete department",
            ]
        })
        .then((answer) => {
            switch (answer.choices) {
                case "View all departments":
                    console.log("Working")
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
                case "Delete employee":
                    deleteEmpl();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete department":
                    deleteDept();
                    break;
                case "End":
                    connection.end();
                    break;
            }
        })
}

function viewDep() {
    let query = "SELECT departments.id, departments.dept_name FROM Employee_tracker.departments";

    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("Here are the departments");

        console.table(res);
        menu();
    })
}
//SELECT SELECT e.id, employees.first_name, employees.lastname, employees.role_id, employees.department, concat(employees.first_name, ' ' ,  employees.last_name) AS Employee FROM employee e LEFT JOIN employee m INNER JOIN role ON employees.role_id = role.id INNER JOIN department ON roles.department_id = department.id ORDER BY ID ASC

function viewRoles() {

    let query = "SELECT roles.id, roles.title, roles.salary, roles.department_id FROM Employee_tracker.roles"

    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("Here's the roles! By salary even!");

        console.table(res);
        menu();
    })
}

function viewEmpl() {
    let query = "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.department_id FROM Employee_tracker.employees;";

    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("Here are the employees!");

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
                conn.query('SELECT id, title FROM roles ORDER BY title ASC'),
                conn.query("SELECT employee.id, employee.first_name, employee.last_name AS Employee FROM employees ORDER BY EMPLOYEE ASC")
            ])
        }).then(([roles, managers]) => {
            for (i = 0; i < roles.length; i++) {
                roleArr.push(roles[i].title);
            }

            // place all managers in array
            for (i = 0; i < managers.length; i++) {
                managerArr.push(managers[i].Employee);
            }

            return Promise.all([roles]);
        }).then(([roles]) => {
            
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
                    message: "What is the employee's Last name?",
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
                    choices: roles,
                    validate: function (input) {
                        if (input === "") {
                            console.log("What is their role? They can not have no role.")
                        } else { return true }
                    }
                },
                connection.query(`INSERT INTO employees (first_name, last_name, role_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${role_id})`, (err, res) => {
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

    promisemysql.createConnection(connectionProperties)
        .then((conn) => {
            return conn.query(`SELECT id, dept_name FROM departments ORDER BY dept_name ASC`);
        }).then((departments = dept_name) => {

            inquirer.prompt([
                //Role prompts for title, dept, salary 
                {
                    name: "title",
                    type: "input",
                    message: "What is the Employees Role?",
                    validate: title => {
                        if (title) {
                            return true;
                        } else {
                            console.log('Please enter a job role');
                            return false;
                        }
                    }
                },
                {
                    name: "dept",
                    type: "list",
                    message: "What department is this role under?",
                    choices: departments,
                    validate: dept => {
                        if (dept) {
                            return true;
                        } else {
                            console.log('Please enter a department');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is the salary of this role?",
                    validate: salary => {
                        if ((salary)) {
                            return true;
                        } else {
                            console.log('Please enter a salary');
                            return false;
                        }
                    }
                },
            ]).then((answer) => {
                //create a department id variable to connect it to the department database
                let deptId;

                //for loop to establish it.

                for (i = 0; i < departments.length; i++) {
                    if (answer.dept = departments[i].id) {
                        deptId = departments[i].id
                    }
                }
                //now we need to connect it to the table!
                connection.query(
                    `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${answer.dept}")`
                )
                console.log(` \n ROLE ${answer.title} added \n`);
                
                menu()

            })
        })
};

function addDept() {
    inquirer.prompt([
        //prompts department name
        {
            type: "input",
            name: "deptName",
            message: "What is the department name?",
            validate: deptName => {
                if (deptName) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
        .then((answer) => {
            connection.query(
                `INSERT INTO departments (dept_name) VALUES ("${answer.deptName}")`,
                (err) => {
                    if (err) return err;
                    console.log("\n Department added! \n")
                        ;
                }
            )
            menu();
        })
}

function updateEmpl() {
    let roleArr = [];
    let employeeArr = [];

    promisemysql.createConnection(connectionProperties)
        .then((conn) => {
            return Promise.all([
                conn.query(`SELECT id, title FROM roles ORDER BY title ASC`),
                conn.query("SELECT employees.id, concat(employees.first_name, ' ', employees.last_name) AS Employee FROM employees ORDER BY Employee ASC")
            ]);
        }).then(([role, employee]) => {
            for (i = 0; i < role.length; i++) {
                roleArr.push(role[i].title);
            }
            for (i = 0; i < employee.length; i++) {
                employee.push(employee[i].Employee);
            }

            return Promise.all(([role, employee]) => {
                inquirer.prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Who do you want to edit?",
                        choices: employeeArr
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

                    for (i = 0; i < role.length; i++) {
                        if (answer.role === role[i].title) {
                            roleID === role[i].id;
                        }
                    }
                    for (i = 0; i < employee.length; i++) {
                        if (answer.employee === employee[i].employee) {
                            employeeID === employee[i].id;
                        }
                    }
                })
                    .then((answer) => {
                        connection.query(
                            `INSERT INTO employees(role_id) VALUES ("${answer.roleID}")`,
                            (err, res) => {
                                if (err) return err;
                                console.log("\n Updated EMployee! \n")
                                menu();
                            }
                        )
                    })
            });
        })
}


function deleteEmpl() {

    let employeeArr = [];

    promisemysql.createConnection(connectionProperties)
        .then((conn) => {
            return Promise.all([
                conn.query(`SELECT id, title FROM roles ORDER BY title ASC`),
                conn.query("SELECT employees.id, concat(employees.first_name, ' ', employees.last_name) AS Employee FROM employees ORDER BY Employee ASC")
            ]);
        }).then(([role, employee]) => {
            for (i = 0; i < role.length; i++) {
                roleArr.push(roles[i].title);
            }
            for (i = 0; i < employee.length; i++) {
                employee.push(employee[i].Employee);
            }

            return Promise.all(([role, employee]) => {
                inquirer.prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Who do you want to delete?",
                        choices: employeeArr
                    },
                    {
                        name: "confirmation",
                        type: "list",
                        message: "Are you sure you want to delte this employee?",
                        choices: [
                            "Yes", "No"
                        ]

                    }]).then((answer) => {
                        if (answer.confirmation === "Yes") {
                            let employeeID

                            for (i = 0; i < employee.length; i++) {
                                if (answer.employee === employee[i].employee) {
                                    employeeID === employee[i].id;
                                }
                            }

                            connection.query(`DELETE FROM employee WHERE id=${employeeID};`), (err, res) => {
                                if (err) return err;
                                //checks for deletion//
                                console.log(`\n Employee '!${answer.employee}' deleted!`)
                                menu();
                            }
                        }
                        else {
                            console.log(`\n Employee '${answer.employee}' was not deleted!`)
                            menu();
                        }

                    })

            })
        }
        )
};

deleteRole = () => {
    const roleSql = `SELECT * FROM roles`; 
  
    connection.promise().query(roleSql, (err, data) => {
      if (err) throw err; 
  
      const role = data.map(({ title, id }) => ({ name: title, value: id }));
  
      inquirer.prompt([
        {
          type: 'list', 
          name: 'role',
          message: "What role do you want to delete?",
          choices: role
        }
      ])
        .then(roleChoice => {
          const role = roleChoice.role;
          const sql = `DELETE FROM roles WHERE id = ?`;
  
          connection.query(sql, role, (err) => {
            if (err) throw err;
            console.log("Successfully deleted!"); 
  
            menu()
        });
      });
    });
  };

function deleteDept() {
    let deptArr = [];

    promisemysql.createConnection(connectionProperties)
        .then((conn) => {
            return Promise.all([
                conn.query(`SELECT id, dept_name FROM departments ORDER BY id ASC`),
            ]);
        }).then(([dept]) => {
            for (i = 0; i < role.length; i++) {
                deptArr.push(dept[i].dept_name);
            }

            return Promise.all(([role]) => {
                inquirer.prompt([
                    {
                        name: "dept",
                        type: "list",
                        message: "What department do you want to remove?",
                        choices: deptArr
                    },
                    {
                        name: "confirmation",
                        type: "list",
                        message: "Are you sure you want to delete this department?",
                        choices: [
                            "Yes", "No"
                        ]

                    }]).then((answer) => {
                        if (answer.confirmation === "Yes") {
                            let deptID

                            for (i = 0; i < employee.length; i++) {
                                if (answer.dept === dept[i].roles) {
                                    deptID === dept[i].id;
                                }
                            }

                            connection.query(`DELETE FROM roles WHERE id=${roleID};`), (err, res) => {
                                if (err) return err;
                                //checks for deletion//
                                console.log(`\n Role '!${answer.dept}' deleted!`)
                                menu();
                            }
                        }
                        else {
                            console.log(`\n Role '${answer.dept}' was not deleted!`)
                            menu();
                        }

                    })
            });
        })
}