import TodoService from "./service.js";
import App from './app.js';
import domElements from './domElements.js';
import { toggleTheme } from './theme.js';

// Theme toggle
document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
document.documentElement.setAttribute('data-bs-theme', 'light');



/* Assignment Instructions
Create a full CRUD application of your choice using an API or JSON Server.
Use JQuery/AJAX to interact with the API. 
Use a form to post new entities.
Build a way for users to update or delete entities.
Include a way to get entities from the API.
Use Bootstrap and CSS to style your project.
*/



/* Tasks Data Structure
[
  {
    "task": "task 1",             Task is stored as string  
    "dueDate": "dueDate 1",       Due Date uses string format for flexibility
    "id": "1"                     id can be set, but api will auto assign next from highest used
  } 
]
*/




// Initializing Classes
const service = new TodoService();
const app = new App(service);



app.initialize();

// Add elements to document and api
$(document).on('click', '#add-new-task', (e) => {
  // Get the input values
  const newTodoName = $('#new-todo-name').val();
  const newTodoDate = $('#new-todo-date').val();

  // Create an object with the new task data
  const newTask = {
    task: newTodoName,
    dueDate: newTodoDate,
  };

  // Call the createTask method of your service to create the task
  service.createTask(newTask);
});

// Delete variables and function
$('#table-body').on('click', '.delete-button', (e) => {
  const $row = $(e.target).closest('tr');
  const id = $row.data('id');
  console.log(`Delete ${id}`);
  service.deleteTask(id, $row);
});


// Edit variables and function
let currentEditId; // Define the variable in a higher scope
let currentEditData; // Define a variable to store the existing data for editing

$(document).on('click', '.edit-button', (e) => {
  const $row = $(e.target).closest('[data-id]');
  currentEditId = $row.data('id'); // Assign the ID to the variable

  // Capture the existing data (task and dueDate) from the table row
  const existingTask = $row.find('.col-6').text();
  const existingDueDate = $row.find('.col-3').text();

  // Store the existing data in an object
  currentEditData = {
    task: existingTask,
    dueDate: existingDueDate,
  };

  // Populate the edit modal's input fields with the existing data
  $('#edit-todo-name').val(currentEditData.task);
  $('#edit-todo-date').val(currentEditData.dueDate);

  console.log(`Edit ${currentEditId}`);
});

// Nested click event to use modal
$(document).on('click', '#save-edit-button', (edit) => {
  // Capture the updated data from modal inputs
  const updatedData = {
    task: $('#edit-todo-name').val(),
    dueDate: $('#edit-todo-date').val(),
  };

  // Call the service.editTask function with ID and updated data
  service.editTask(currentEditId, updatedData);
});

