const inquirer = require("inquirer");
const connection = require("./config/connection");
const cTable = require("console.table");

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
        "Exit",
      ],
    })
    .then(function (answer) {
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
          connection.end();
          break;
      }
    });
}

function viewAll() {
  // const query = "SELECT first_name, last_name FROM employee LEFT JOIN role ON employee.role_id = role.id";
  const query =
    "SELECT first_name AS FirstName , last_name as LastName , role.title as Role, role.salary AS Salary, department.name AS Department FROM employee INNER JOIN department ON department.id = employee.role_id left JOIN role ON role.id = employee.role_id";

  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllDepartment() {
  connection.query("SELECT name AS Departments FROM department ", function (
    err,
    results
  ) {
    console.table(results);
    if (err) throw err;
    start();
  });
}

function viewAllManager() {
  var query =
    "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id
      );
    }

    start();
  });
}

function viewAllRoles() {
  connection.query("SELECT title AS title FROM role", function (err, results) {
    console.table(results);
    if (err) throw err;
    start();
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstname",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastname",
          message: "What is the employee's last name?",
        },
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }

            return choiceArray;
          },
          message: "What is the employee's role?",
        },

        {
          type: "input",
          name: "emanager",
          message: "What is the employee's manager?",
        },
      ])
      .then(function (res) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === res.choice) {
            res.role_id = results[i].id;
          }
        }
        var query = "INSERT INTO employee SET ?";
        const VALUES = {
          first_name: res.firstname,
          last_name: res.lastname,
          role_id: res.role_id,
          // manager_id: employee(id)
        };
        connection.query(query, VALUES, function (err) {
          if (err) throw err;
          console.log("Employee successfully added!");
          start();
        });
      });
  });
}

function removeEmployee() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id",
    })
    .then(function (answer) {
      console.log(answer);
      var query = "DELETE FROM employee WHERE ?";
      var newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        start();
      });
    });
}

function updateEmployee() {
  console.log("updating emp");
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (answer) {
      var id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (answer) {
          var roleId = answer.roleId;

          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            start();
          });
        });
    });
}

function updateEmployeeManager() {
  inquirer
    .prompt({
      name: "employeeManager",
      type: "input",
      message: "What employee would you like to update the manager for?",
      //choices: need to figure out if we want to pull this by employee and then prompt for manager name
    })
    .then(function (answer) {
      var query = "SELECT manager_id FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].employee);
        }

        start();
      });
    });
}

function viewAllRoles() {
  connection.query("Select title as Roles from role ", function (err, results) {
    console.table(results);
    if (err) throw err;
    start();
  });
}

start();
