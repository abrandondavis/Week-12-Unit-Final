


const defaultURL = 'https://64f40193932537f4051a10a6.mockapi.io/api/to-do';



export default class TodoService {
  constructor(url) {
    this.url = url || defaultURL;

  }

  /**
   * Retrieves all tasks
   * @returns {Promise} Promise contains data from the request
   */
  getTasks() {
    const url = `${this.url}/tasks`
    console.log(`requesting data from endpoint ${url}`);

    //Modern version of code not using jquery
    //return fetch(url).then(res => res.json());

    return new Promise((resolve, reject) => {
      return $.ajax({
        url: url,
        dataType: 'json',
        success: (res) => {
          return resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  deleteTask(id, $row) {
    console.log('delete was clicked');
    fetch(`https://64f40193932537f4051a10a6.mockapi.io/api/to-do/tasks/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      // Do something with deleted task
      //window.location.reload();  // This line would refresh the page and is just worse code
      $row.remove();               // .remove() using the $row variable still removes it from the UI without the need to refresh
    }).catch(error => {
      // handle error
    })
  }

  createTask(newTask) {
    console.log('add button was clicked');

    // You can now send an HTTP POST request to create the new task using fetch or any other AJAX method.
    // Construct the request, send it to your API, and handle the response.
    // Here's a general idea of how it might look:
    fetch('https://64f40193932537f4051a10a6.mockapi.io/api/to-do/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // Handle error if the request was not successful
          throw new Error('Failed to create task');
        }
      })
      .then((createdTask) => {
        // Handle the created task data, e.g., update the UI
        console.log('New task created:', createdTask);

        // Append the new task to the table body
        const $tableBody = $('#table-body');
        $tableBody.prepend(
          ` <tr class="action-delete action-edit" data-id="${createdTask.id}">
              <td class="col-2">${createdTask.id}</td>
              <td class="col-6">${createdTask.task}</td>
              <td class="col-3">${createdTask.dueDate}</td>
              <td class="col-1 text-end">
                <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#taskModal"></i>
                <i class="bi bi-trash3 delete-button"></i>
              </td>
            </tr>`
        );

        // Optionally, you can reset the input fields after successful task creation
        $('#new-todo-name').val('');
        $('#new-todo-date').val('');
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error creating task:', error);
      });
  }

  editTask(id, updatedData) {
    console.log('edit was clicked');

    // Prepare the request body with updated data
    const requestBody = JSON.stringify(updatedData);

    fetch(`https://64f40193932537f4051a10a6.mockapi.io/api/to-do/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody, // Send the updated data in the request body
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
        throw new Error('Failed to update task');
      })
      .then((updatedTask) => {
        // Handle the updated task data as needed
        console.log('Task updated:', updatedTask);
        // Update the UI with the edited task data
        const $taskRow = $(`[data-id="${id}"]`);
        $taskRow.find('.col-6').text(updatedTask.task);
        $taskRow.find('.col-3').text(updatedTask.dueDate);

        // Close the modal or perform any other necessary actions
        $('#taskModal').modal('hide');

        // You may want to refresh the task list to reflect the changes
        // Consider calling a function to re-fetch and update the task list here.
      })
      .catch((error) => {
        // handle error
        console.error('Error updating task:', error);
      });
  }
}
