const db = require('../connection/connection.js');
const inquirer = require('inquirer');

choices = require('./choices.js');


async function addDept() {

    console.log("\n");
    let id = [];
    const sql = 'SELECT MAX(ID) FROM department';

    db.query(sql, (err,data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            id.push(obj);})
    let stringID = JSON.stringify(id).replaceAll('[', '').replaceAll(']', '');
    let numberID = parseInt(stringID);
    let newID = numberID + 1;


    inquirer
        .prompt([
            {
                type: 'input',
                name: 'input',
                message: "What's the name of the department you'd like to add?"      } ])
        
        .then((answer) => {
            console.log(answer.input);
            let deptName = JSON.stringify(answer.input).replaceAll('"', '');

            const sql2 = `INSERT INTO department (id, department_name) VALUES ('${newID}', '${deptName}');`;
           
            db.query(sql2, (err, data) => {
                if (err) throw err;

                console.log(`Completed! ${deptName} department added.`)
        
                choices.mainChoices();
            });  })  })
}


async function addRole() {

    console.log("\n");
    let id = [];
    let deptArray = [];

    const sql = 'SELECT MAX(ID) FROM role';

    db.query(sql, (err,data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            id.push(obj);})
    let stringID = JSON.stringify(id).replaceAll('[', '').replaceAll(']', '');
    let numberID = parseInt(stringID);
    let newID = numberID + 1;

    const sql2 = 'SELECT department_name FROM department';

    db.query(sql2, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            deptArray.push(obj);})

    let newDeptArray = [];

    deptArray.forEach(element => {
        newDeptArray.push(" " + element);
    });


    inquirer
         .prompt([
        {   type: 'input',
            name: 'roleName',
            message: 'What is the name of the new role?'},
        {   type: 'input', 
            name: 'salary',
            message: 'What is the salary of the new role?'},
        {   type: 'list',
            name: 'deptName',
            message: 'Which department will this new role be apart of?',
            choices: newDeptArray }])
        .then((answers) => {

            let trimmedAnswer = answers.deptName.trimStart();
        
            const sql3 = `SELECT id FROM department WHERE department_name = '${trimmedAnswer}'`;

            let deptID = [];

            console.log("\n");

            db.query(sql3, (err, data) => {
                if (err) throw err;

                Object.values(data).forEach(val => {const obj = Object.values(val);
                    deptID.push(obj); })

                let newElement;

                deptID.forEach(element => {
                    const stringElement = JSON.stringify(element);
                    newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');});

            const sql4 = `INSERT INTO role (id, role_title, salary, department_id) VALUES ('${newID}', '${answers.roleName}', '${answers.salary}', '${newElement}');`;

    
             db.query(sql4, (err, data) => {
                 if (err) throw err;

                 console.log(`Completed! ${answers.roleName} role added.`)
        
                 choices.mainChoices();
 }) })  })  })  })
}


async function addEmp() {

    console.log("\n");
    let id = [];
    const sql = 'SELECT MAX(id) FROM employee';

    db.query(sql, (err,data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            id.push(obj);})
    let stringID = JSON.stringify(id).replaceAll('[', '').replaceAll(']', '');
    let numberID = parseInt(stringID);
    let newID = numberID + 1;

    const sql2 = 'SELECT first_name, last_name FROM employee WHERE (id IN (SELECT manager_id FROM employee));'

    let manageArray = [];

    db.query(sql2, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            manageArray.push(obj);})

        let newManageArray = [];

        manageArray.forEach(element => {
            const stringElement = JSON.stringify(element);
            const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
            newManageArray.push(newElement);
        });

    let roleArray = [];
    let newRoleArray = [];
    const sql = 'SELECT role_title FROM role';

    db.query(sql, (err, data) => {
        if (err) throw err;

        Object.values(data).forEach(val => {const obj = Object.values(val);
            roleArray.push(obj);})

        roleArray.forEach(element => {
            const roleString = JSON.stringify(element);
            const newRoleString = roleString.replaceAll("'", "").replaceAll('"', '').replaceAll(']','').replaceAll('[','');
            newRoleArray.push(newRoleString);
        })

    inquirer
        .prompt([{
            type: 'input',
            name: 'firstName',
            message: "What is the first name of the new employee?"  },

        {   type: 'input',
            name: 'lastName',
            message: "What is the last name of the new employee?"  },

        {   type: 'list',
            name: 'role',
            message: "What role will they be starting in?",
            choices: newRoleArray   },

        {   type: 'list',
            name: 'manager',
            message: "Which manager will they be starting under?",
            choices: newManageArray    
        }])
        .then((answers) => {

            let managerID = [];
            let roleID = [];
            let jsonAnswer = JSON.stringify(answers.manager);
            let nameArray = jsonAnswer.split(' ');
            const newElement = nameArray[1].replace('"', '').replace('}', '');

            const sql3 = `SELECT id FROM employee WHERE last_name = '${newElement}'`

            db.query(sql3, (err, data) => {
                if (err) throw err;
                Object.values(data).forEach(val => {const obj = Object.values(val);
                    managerID.push(obj);}) 

            const sql4 = `SELECT id FROM role WHERE role_title = '${answers.role}'`

            db.query(sql4, (err, data) => {
                if (err) throw err;
                Object.values(data).forEach(val => {const obj = Object.values(val);
                    roleID.push(obj);}) 

       const sql5 = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ('${newID}', '${answers.firstName}', '${answers.lastName}', '${roleID}', '${managerID}');`;

       db.query(sql5, (err, data) => {
        if (err) throw err;
        
        console.log("\n");
        console.log(`Completed! ${answers.firstName} ${answers.lastName} added to employees.`)

        choices.mainChoices();

     })  })  })  })  }) }) })

    
}


module.exports = {addDept, addRole, addEmp};