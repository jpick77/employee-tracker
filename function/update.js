const inquirer = require('inquirer');
const db = require('../connection/connection.js');

choices = require('./choices.js');


async function updateEmpRole() {
    console.log("\n");
    let empArray = [];
    let newEmpArray = [];
    let roleArray = [];
    let newRoleArray = [];
    let roleID = [];

    const sql = 'SELECT first_name, last_name FROM employee';
    db.query(sql, (err, data) => {
        if (err) throw err;
        
        Object.values(data).forEach(val => {const obj = Object.values(val);
            empArray.push(obj);})

        empArray.forEach(element => {
            const stringElement = JSON.stringify(element);
            const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
            newEmpArray.push(newElement);
        });

    const sql2 = 'SELECT role_title FROM role';
    db.query(sql2, (err, data) => {
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
                name: 'employee',
                message: 'Which employee would you like to change the role of?',
                choices: newEmpArray
            },
            {   type: 'list',
                name: 'role',
                message: 'What will be their new role?',
                choices: newRoleArray   }
        ])
            .then((answers) => {

                let jsonAnswer = JSON.stringify(answers.employee);
                let nameArray = jsonAnswer.split(' ');
                const newElement = nameArray[1].replace('"', '').replace('}', '');

                const sql3 = `SELECT id FROM role WHERE role_title = '${answers.role}'`

                db.query(sql3, (err, data) => {
                    if (err) throw err;
                    Object.values(data).forEach(val => {const obj = Object.values(val);
                        roleID.push(obj);})   

            const sql4 = `UPDATE employee SET role_id = '${roleID}' WHERE last_name = '${newElement}'`
           
            db.query(sql4, (err, data) => {
                if (err) throw err;
                
                console.log("\n");
                console.log(`Completed! ${answers.employee} promoted to ${answers.role}.`)
        
                choices.mainChoices();

    })  })  })  }) })
}

async function updateEmpManager() {

    console.log("\n");

    const sql = 'SELECT first_name, last_name FROM employee WHERE (id IN (SELECT manager_id FROM employee));'

    let manageArray = [];
    let empArray = [];

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


        const sql2 = 'SELECT first_name, last_name FROM employee';
        let newEmpArray = [];
        db.query(sql2, (err, data) => {
            if (err) throw err;
            
            Object.values(data).forEach(val => {const obj = Object.values(val);
                empArray.push(obj);})
    
            empArray.forEach(element => {
                const stringElement = JSON.stringify(element);
                const newElement = stringElement.replace(',',' ').replaceAll('[','').replaceAll('"','').replaceAll(']','');
                newEmpArray.push(newElement);
            });


        inquirer.
            prompt([{
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to change the manager of?',
                choices: newEmpArray    },
                
            {   type: 'list',
                name: 'manager',
                message: 'Which manager would you like them to be under?',
                choices: newManageArray     }
            ])
            .then((answers) => {
                let managerID = [];

                let jsonAnswer = JSON.stringify(answers.employee);
                let nameArray = jsonAnswer.split(' ');
                const lastNameEmployee = nameArray[1].replace('"', '').replace('}', '');

                let jsonAnswer2 = JSON.stringify(answers.manager);
                let nameArray2 = jsonAnswer2.split(' ');
                const lastNameManager = nameArray2[1].replace('"', '').replace('}', '');
    
            const sql3 = `SELECT id FROM employee WHERE last_name = '${lastNameManager}'`

            db.query(sql3, (err, data) => {
                if (err) throw err;
                Object.values(data).forEach(val => {const obj = Object.values(val);
                    managerID.push(obj);}) 

            
            const sql4 = `UPDATE employee SET manager_id = '${managerID}' WHERE last_name = '${lastNameEmployee}'`

            db.query(sql4, (err, data) => {
                if (err) throw err;
                
                console.log("\n");
                console.log(`Completed! ${answers.employee} now works under ${answers.manager}.`)
        
                choices.mainChoices();

    })  })  })  })  })

}

module.exports = {updateEmpRole, updateEmpManager};