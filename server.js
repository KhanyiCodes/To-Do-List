// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let tasks = [
  { id: 1, text: 'Example Task', completed: false }
];

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json({ message: 'Task added successfully!', task: newTask });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id != id);
  res.json({ message: 'Task deleted successfully!' });
});

// Toggle task completion
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.completed = !task.completed;
    res.json({ message: 'Task status updated!', task });
  } else {
    res.status(404).json({ message: 'Task not found!' });
  }
});

// Serve the static HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
