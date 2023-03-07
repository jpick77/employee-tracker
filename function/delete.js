const inquirer = require('inquirer');
const db = require('../connection/connection.js');

choices = require('./choices.js');

async function deleteDept() {
    console.log("\n");
    let deptArray = [];
    let newDeptArray = [];
    const sql = 'SELECT department_name FROM department';

    db.query(sql, (err, data) => {
        if (err) throw err;
        Object.values(data).forEach(val => {const obj = Object.values(val);
            deptArray.push(obj);})

        deptArray.forEach(element => {
            const deptString = JSON.stringify(element);
            const newDeptString = deptString.replaceAll("'", "").replaceAll('"', '').replaceAll(']','').replaceAll('[','');
            newDeptArray.push(newDeptString);
        })

        inquirer
            .prompt([{
                type: 'list',
                name: 'department',
                message: 'Which department would you like to delete?',
                choices: newDeptArray
            }])
            .then((answer) => {
                const sql1 = 'SET FOREIGN_KEY_CHECKS=0;'

                db.query(sql1, (err, data) => {
                    if (err) throw err;
                

                const sql2 = `DELETE FROM department WHERE department_name = '${answer.department}';`

                db.query(sql2, (err, data) => {
                    if (err) throw err;
                    
                    console.log("\n");
                    console.log(`Completed! ${answer.department} was deleted.`)
            
                    choices.mainChoices();
       }) })  }) })
}

async function deleteRole() {
    console.log("\n");
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
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: newRoleArray
    }])
        .then((answer) => {

            const sql1 = 'SET FOREIGN_KEY_CHECKS=0;'

            db.query(sql1, (err, data) => {
                if (err) throw err;

            const sql2 = `DELETE FROM role WHERE role_title = '${answer.role}';`

            db.query(sql2, (err, data) => {
                if (err) throw err;
                
                console.log("\n");
                console.log(`Completed! ${answer.role} was deleted.`)
        
                choices.mainChoices();
    })  })  })  })


}

async function deleteEmp() {
    console.log("\n");
    let empArray = [];
    let newEmpArray = [];

    const sql2 = 'SELECT first_name, last_name FROM employee';
    db.query(sql2, (err, data) => {
        if (err) throw err;
        
        Object.values(data).forEach(val => {const obj = Object.values(val);
            empArray.push(obj);})

        empArray.forEach(element => {
            const stringElement = JSON.stringify(element);
            const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
            newEmpArray.push(newElement);
        });

        inquirer
        .prompt([{
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to delete?',
            choices: newEmpArray
        }])
        .then((answer) => {

            let jsonAnswer = JSON.stringify(answer.employee);
            let nameArray = jsonAnswer.split(' ');
            const lastNameEmployee = nameArray[1].replace('"', '').replace('}', '');

            const sql1 = 'SET FOREIGN_KEY_CHECKS=0;'

            db.query(sql1, (err, data) => {
                if (err) throw err;
            

            const sql2 = `DELETE FROM employee WHERE last_name = '${lastNameEmployee}';`

            db.query(sql2, (err, data) => {
                if (err) throw err;
                
                console.log("\n");
                console.log(`Completed! ${answer.employee} was deleted.`)
        
                choices.mainChoices();
    })  })  })  })
}

module.exports = {deleteDept, deleteEmp, deleteRole};