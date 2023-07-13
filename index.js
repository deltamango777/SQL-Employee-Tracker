const inquirer = require('inquirer');
const connectDb = require('./connection');
const {
  VIEW_DEPARTMENTS,
  VIEW_ROLES,
  VIEW_EMPLOYEES,
  ADD_DEPARTMENT,
  ADD_ROLE,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE_ROLE
} = require('./queries');

async function main() {
  const db = await connectDb();

  async function viewDepartments() {
    const departments = await db.query(VIEW_DEPARTMENTS);
    console.table(departments);
  }

  async function viewRoles() {
    const roles = await db.query(VIEW_ROLES);
    console.table(roles);
  }

  async function viewEmployees() {
    const employees = await db.query(VIEW_EMPLOYEES);
    console.table(employees);
  }

  async function addDepartment() {
    const { department } = await inquirer.prompt({
      name: 'department',
      message: 'What is the name of the department?'
    });
    await db.query(ADD_DEPARTMENT, department);
  }

  async function addRole() {
    const { title, salary, department_id } = await inquirer.prompt([
      {
        name: 'title',
        message: 'What is the title of the role?'
      },
      {
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        name: 'department_id',
        message: 'What is the department ID of the role?'
      }
    ]);
    await db.query(ADD_ROLE, [title, salary, department_id]);
  }

  async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        name: 'firstName',
        message: 'What is the employee first name?'
      },
      {
        name: 'lastName',
        message: 'What is the employee last name?'
      },
      {
        name: 'roleId',
        message: 'What is the role ID of the employee?'
      },
      {
        name: 'managerId',
        message: 'What is the manager ID of the employee?'
      }
    ]);
    await db.query(ADD_EMPLOYEE, [firstName, lastName, roleId, managerId]);
  }

  async function updateEmployeeRole() {
    const { employeeId, roleId } = await inquirer.prompt([
      {
        name: 'employeeId',
        message: 'Which employee ID do you want to update?'
      },
      {
        name: 'roleId',
        message: 'What is the new role ID for the employee?'
      }
    ]);
    await db.query(UPDATE_EMPLOYEE_ROLE, [roleId, employeeId]);
  }

  async function prompt() {
    const { operation } = await inquirer.prompt({
      name: 'operation',
      type: 'list',
      message: 'What do you want to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
      ]
    });

    switch (operation) {
      case 'View all departments':
        await viewDepartments();
        break;
      case 'View all roles':
        await viewRoles();
        break;
      case 'View all employees':
        await viewEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      default:
        process.exit(0);
    }

    await prompt();
  }

  await prompt();
}

main();
