const inquirer = require("inquirer");
const orm = require("./config/orm");

function start() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
          case "View All Employees":
            viewAll();
            break;

          case "View All Employees By Department":
            viewAllDepartment();
            break;

          case "View All Employees By Manager":
            viewAllManager();
            break;

          case "Add Employee":
            addEmployee();
            break;

          case "Remove Employee":
            removeEmployee();
            break;

          case "Update Employee Role":
            updateEmployee();
            break;

          case "Update Employee Manager":
            updateEmployeeManager();
            break;

          case "View All Roles":
            viewAllRoles();
            break;

          case "Exit":
            exit();
            break;
        }
    });
}

function viewAll () {

}