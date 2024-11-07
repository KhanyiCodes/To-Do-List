const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', toggleCompleteOrDelete);

function addTodo() {
    const newTodo = todoInput.value;
    if (newTodo.trim() !== '') {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <input type="checkbox">
            <span>${newTodo}</span>
            <button>Delete</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
    }
}

function toggleCompleteOrDelete(event) {
    const target = event.target;
    if (target.type === 'checkbox') {
        const todoItem = target.parentElement;
        todoItem.classList.toggle('completed');
    } else if (target.tagName === 'BUTTON') {
        const todoItem = target.parentElement;
        todoList.removeChild(todoItem);
    }
}