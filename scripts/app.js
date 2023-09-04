import domElements from './domElements.js';

const $tableBody = domElements.$tableBody;


export default class App {
  constructor(service) {
    this.service = service;
  }
  initialize() {
    this.service.getTasks().then(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        $tableBody.prepend(
          ` <tr class="action-delete action-edit"  data-id="${ task.id }">
              <td class="col-2">${task.id}</td>
              <td class="col-6">${task.task}</td>
              <td class="col-3">${task.dueDate}</td>
              <td class="col-1 text-end">
                <i class="bi bi-pencil edit-button" data-bs-toggle="modal" data-bs-target="#taskModal"></i>
                <i class="bi bi-trash3 delete-button"></i>
              </td>
            </tr>`
        )
      });
    })
  }

}

