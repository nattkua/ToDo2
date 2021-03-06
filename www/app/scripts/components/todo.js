import { colorDarken, dateCompair } from '../utils/helpers';;

class Todo {
  constructor(data) {
    this.rendered = false;
    this.id = data.id;
    this.title = data.title;
    this.dueDate = data.due_date;
    this.overdue = dateCompair(data.due_date);
    this.completed = data.completed;
    this.primaryAction = null;
    this.delete = null;
    this.edit = null;

    this.div = null;
    this.color = 'B10DC9';
    this.deleteBTN = null;
    this.editBTN = null;
    this.primaryBTN = null;

    this.build();
    this.events();
  }

  events() {
    this.primaryBTN.addEventListener('click', () => {
      this.primaryAction(this);
    });

    if (this.completed === false) {
      this.deleteBTN.addEventListener('click', () => {
        this.delete(this);
      });

      this.editBTN.addEventListener('click', () => {
        this.edit(this);
      });
    }
  }

  in(delay) {
    let todo = this;

    setTimeout(() => {
      requestAnimationFrame(() =>  {
        todo.div.classList.remove('js-todo-in');
      });
    }, delay);
  }

  out(delay) {
    let todo = this;

    setTimeout(() => {
      requestAnimationFrame(() => {
        todo.div.classList.add('js-todo-out');
      });
    }, delay);
  }

  refresh() {
    this.div.querySelector('h3.todo-info__title').innerHTML = this.title;
    this.div.querySelector('h2.todo-info__title span.text').innerHTML = this.dueDate;
    this.isOverdue();
  }

  isOverdue() {
    if (dateCompair(this.dueDate)) {
      this.div.querySelector('.message').classList.add('active');
    }else {
      this.div.querySelector('.message').classList.remove('active');
    }
  }

  build() {
    let todo = this;
    const color = this.color;
    // creating todo div
    todo.div = document.createElement('div');
    todo.div.setAttribute('style', [`color: #${color}`])
    todo.div.className = (todo.completed === false) ? `todo js-todo-in` : `todo completed js-todo-in`;
    todo.div.id = todo.id;
    todo.div.tabIndex = 0;

    let messageDiv = document.createElement('div');
    messageDiv.className = (todo.overdue === true && todo.completed === false) ? 'message message--urgent active' : 'message message--urgent';

    let messageText = document.createElement('p');
    messageText.innerHTML = 'This ToDo is OverDo!';

    let infoDiv = document.createElement('div');
    infoDiv.className = 'todo-info';

    let subButtonDiv = document.createElement('div');
    subButtonDiv.className = 'todo-button-group button-group';

    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'todo-primary-action';

    let dueDate = document.createElement('h2');
    dueDate.innerHTML = `Due: <span class="text">${todo.dueDate}</span>`;
    dueDate.className = 'todo-info__title';

    let title = document.createElement('h3');
    title.innerHTML = todo.title;
    title.className = 'todo-info__title';

    if(todo.completed === false) {
      todo.primaryBTN = document.createElement('button');
      todo.primaryBTN.innerHTML = 'Done';
      todo.primaryBTN.className = 'button button--primary button--large js-todo-complete';

      todo.editBTN = document.createElement('button');
      todo.editBTN.innerHTML = 'Edit';
      todo.editBTN.className = 'button button--secondary js-todo-edit';

      todo.deleteBTN = document.createElement('button');
      todo.deleteBTN.innerHTML = 'Delete';
      todo.deleteBTN.className = 'button button--secondary js-todo-delete';

      subButtonDiv.appendChild(todo.editBTN);
      subButtonDiv.appendChild(todo.deleteBTN);
      buttonDiv.appendChild(todo.primaryBTN);
    }else {
      todo.primaryBTN = document.createElement('button');
      todo.primaryBTN.innerHTML = 'Undo';
      todo.primaryBTN.className = 'button button--primary button--large js-todo-undo ';

      buttonDiv.appendChild(todo.primaryBTN);
    }

    // attach all the pieces to the main div
    messageDiv.appendChild(messageText);
    infoDiv.appendChild(dueDate);
    infoDiv.appendChild(title);
    infoDiv.appendChild(subButtonDiv);
    todo.div.appendChild(messageDiv);
    todo.div.appendChild(infoDiv);
    todo.div.appendChild(buttonDiv);
  }
}

export default Todo;
