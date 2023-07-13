const VIEW_DEPARTMENTS = 'SELECT * FROM department';
const VIEW_ROLES = 'SELECT * FROM role';
const VIEW_EMPLOYEES = 'SELECT * FROM employee';
const ADD_DEPARTMENT = 'INSERT INTO department (name) VALUES (?)';
const ADD_ROLE = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
const ADD_EMPLOYEE = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
const UPDATE_EMPLOYEE_ROLE = 'UPDATE employee SET role_id = ? WHERE id = ?';

module.exports = {
  VIEW_DEPARTMENTS,
  VIEW_ROLES,
  VIEW_EMPLOYEES,
  ADD_DEPARTMENT,
  ADD_ROLE,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE_ROLE
};
