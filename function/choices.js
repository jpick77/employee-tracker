const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = require('../connection/connection.js');
view = require('../function/view.js');
add = require('../function/add.js');
update = require('../function/update.js');
remove = require('../function/delete.js');

function mainChoices() {

    console.log("\n"); // a line break for formatting

    const options = [{
        type: 'list',
        name: 'choices',
        message: 'What would you like to do today?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Manager', 'View Employees by Department', 'View Total Utilized Budget of a Department', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update Employee Manager', 'Delete a Department', 'Delete a Role', 'Delete an Employee', 'Exit']
    }];

    inquirer.prompt(options).then((answers) => {
        if (answers.choices === 'View All Departments') {
            view.viewAllDept();  }

        if (answers.choices === 'View All Roles') {
            view.viewAllRoles();  }

        if (answers.choices === 'View All Employees') {
            view.viewAllEmployees();  }

        if (answers.choices === 'View Employees by Manager') {
            view.viewEmpbyManage();     }


        if (answers.choices === 'View Employees by Department') {
            view.viewEmpbyDept();  }

        if (answers.choices === 'View Total Utilized Budget of a Department') {
            view.viewBudget();   }
        
        if (answers.choices === 'Add a Department') {
            add.addDept();  }
        
        if (answers.choices === 'Add a Role') {
            add.addRole();  }

        if (answers.choices === 'Add an Employee') {
            add.addEmp();  }
            
        if (answers.choices === 'Update an Employee Role') {
            update.updateEmpRole();  }

        if (answers.choices === 'Update Employee Manager') {
            update.updateEmpManager();  }

        if (answers.choices === 'Delete a Department') {
            remove.deleteDept();  }

        if (answers.choices === 'Delete a Role') {
            remove.deleteRole();  }

        if (answers.choices === 'Delete an Employee') {
            remove.deleteEmp();  }

        if (answers.choices === 'Exit') {
            endProgram();   }
    });
    
};


function endProgram() {
    console.log("\n Thank you for using our Employee Tracker! Goodbye!");
    process.exit(0);
}


module.exports = {mainChoices};