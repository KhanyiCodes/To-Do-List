// app.js
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');
const completedList = document.getElementById('completedList');
const messageDiv = document.getElementById('message');

let tasks = [];

// Fetch tasks from the server
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    tasks = data;
    renderTasks();
  } catch (error) {
    showMessage('Failed to load tasks', 'error');
  }
}

// Render tasks into respective lists
function renderTasks() {
  todoList.innerHTML = '';
  completedList.innerHTML = '';
  
  tasks.forEach(task => {
    const taskCard = createTaskCard(task);
    if (task.completed) {
      completedList.appendChild(taskCard);
    } else {
      todoList.appendChild(taskCard);
    }
  });
}

// Create a task card
function createTaskCard(task) {
  const card = document.createElement('div');
  card.classList.add('task-card');

  const taskText = document.createElement('span');
  taskText.textContent = task.text;
  if (task.completed) taskText.classList.add('completed');
  
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('completed');
  completeBtn.textContent = '✓';
  
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.textContent = '✖';
  
  completeBtn.addEventListener('click', () => toggleTaskCompletion(task.id));
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  card.appendChild(taskText);
  card.appendChild(completeBtn);
  card.appendChild(deleteBtn);

  return card;
}

// Add a new task
async function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText })
    });
    const data = await response.json();
    tasks.push(data.task);
    renderTasks();
    showMessage(data.message, 'success');
    taskInput.value = ''; // Clear input field
  } catch (error) {
    showMessage('Failed to add task', 'error');
  }
}

// Toggle task completion
async function toggleTaskCompletion(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, { method: 'PUT' });
    const data = await response.json();
    tasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    showMessage(data.message, 'success');
  } catch (error) {
    showMessage('Failed to update task', 'error');
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    const data = await response.json();
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    showMessage(data.message, 'success');
  } catch (error) {
    showMessage('Failed to delete task', 'error');
  }
}

// Display messages to the user
function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.style.color = type === 'success' ? 'green' : 'red';
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initialize the app
loadTasks();
