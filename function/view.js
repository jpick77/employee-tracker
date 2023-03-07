const inquirer = require('inquirer');
const db = require('../connection/connection.js');

choices = require('./choices.js');


async function viewAllDept() {
    let deptArray = [];
    console.log("\n");
    const sql = 'SELECT department_name FROM department';

    
    db.query(sql, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            deptArray.push(obj);})

        deptArray.forEach(element => {
            console.log(" " + element);
        })
        console.log("\n");
        choices.mainChoices();
    }); 
};


async function viewAllRoles() {
    let roleArray = [];
    console.log("\n");
    const sql = 'SELECT role_title FROM role';

    db.query(sql, (err, data) => {
        if (err) throw err;

        Object.values(data).forEach(val => {const obj = Object.values(val);
            roleArray.push(obj);})

        roleArray.forEach(element => {
            console.log(" " + element);
        });
        console.log("\n");
        choices.mainChoices();
     }); 
};


async function viewAllEmployees() {
    let empArray = [];
    console.log("\n");
    const sql = 'SELECT first_name, last_name FROM employee';
    db.query(sql, (err, data) => {
        if (err) throw err;
        
        Object.values(data).forEach(val => {const obj = Object.values(val);
            empArray.push(obj);})

        empArray.forEach(element => {
            const stringElement = JSON.stringify(element);
            const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
            console.log(" " + newElement);
        });
        console.log("\n");
        choices.mainChoices();
     }); 
};


async function viewEmpbyManage() {
    let manageArray = [];
    console.log("\n");

    const sql = 'SELECT first_name, last_name FROM employee WHERE (id IN (SELECT manager_id FROM employee));'

    db.query(sql, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            manageArray.push(obj);})

        let newManageArray = [];

        manageArray.forEach(element => {
            const stringElement = JSON.stringify(element);
            const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
            newManageArray.push(newElement);
        });
      

    inquirer
        .prompt([
        {   type: 'list',
            name: 'manager', 
            message: 'Which manager would you like to see the employees of?',
            choices: newManageArray }])

        .then((answer) => {
            let jsonAnswer = JSON.stringify(answer);
            let nameArray = jsonAnswer.split(' ');
            const newElement = nameArray[1].replace('"', '').replace('}', '');

            const sql2 = `SELECT first_name, last_name FROM employee WHERE (manager_id IN (SELECT id FROM employee WHERE last_name = '${newElement}'));`

            let empArray = [];

            console.log("\n");

            db.query(sql2, (err, data) => {
                if (err) throw err;

                Object.values(data).forEach(val => {const obj = Object.values(val);
                    empArray.push(obj); })


                empArray.forEach(element => {
                    const stringElement = JSON.stringify(element);
                    const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
                    console.log(" " + newElement);  });

                choices.mainChoices();

        })  })  });
};


async function viewEmpbyDept() {
    let deptArray = [];
    console.log("\n");

    const sql = 'SELECT department_name FROM department';

        
    db.query(sql, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            deptArray.push(obj);})

    let newDeptArray = [];

    deptArray.forEach(element => {
        newDeptArray.push(" " + element);
    });


    inquirer
        .prompt([
            {   type: 'list',
                name: 'dept',
                message: 'Which department would you like to see the employees of?',
                choices: newDeptArray }])

        .then((answer) => {

            let trimmedAnswer = answer.dept.trimStart();

            const sql2 = `SELECT first_name, last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department_name = '${trimmedAnswer}'`

            let empArray = [];

            console.log("\n");

            db.query(sql2, (err, data) => {
                if (err) throw err;

                Object.values(data).forEach(val => {const obj = Object.values(val);
                    empArray.push(obj); })


                empArray.forEach(element => {
                    const stringElement = JSON.stringify(element);
                    const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
                    console.log(" " + newElement);  });

                choices.mainChoices();

                });   })     })
    }; 


async function viewBudget() {
    let deptArray = [];
    console.log("\n");

    const sql = 'SELECT department_name FROM department';

    db.query(sql, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            deptArray.push(obj);})

    let newDeptArray = [];

    deptArray.forEach(element => {
        newDeptArray.push(" " + element);
    });


    inquirer
        .prompt([
            {   type: 'list',
                name: 'dept',
                message: 'Which department would you like to see the totalized budget of?',
                choices: newDeptArray }])

        .then((answer) => {

        let trimmedAnswer = answer.dept.trimStart();

        const sql2 = `SELECT SUM(salary) FROM role JOIN department ON role.department_id = department.id WHERE department_name = '${trimmedAnswer}'`

        let budgeArray = [];

        console.log("\n");

        db.query(sql2, (err, data) => {
            if (err) throw err;
            Object.values(data).forEach(val => {const obj = Object.values(val);
                budgeArray.push(obj);})
    
            budgeArray.forEach(element => {
                console.log(" " + element);
            })

            console.log("\n");
            choices.mainChoices();

        });     });      });
};


module.exports = {viewAllDept, viewAllRoles, viewAllEmployees, viewEmpbyManage, viewEmpbyDept, viewBudget};