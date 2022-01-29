//Index.js//
const mysql =require("mysql")
var inquirer = require('inquirer')
const fs = require('fs')



function menu (){
    inquirer
    .prompt ({
    type: "list",
    name: "choices",
    choices: [
        "view all departments", 
        "view all roles", 
        "view all employees",
        "add a department",
        "add a role", 
        "add an employee",
        "update an employee role"
    ]
        })
        .then((answer) =>{
            
        })
  }

function viewDepartment (){}