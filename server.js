// Import the required modules
const express = require('express');
const path = require('path');
const app = express();

// Set the port to 3000 or an environment variable if it's set
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// A sample route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example of an API route (could be used for To-Do List items)
app.get('/api/todos', (req, res) => {
    const todos = [
        { id: 1, text: 'Learn Node.js', completed: false },
        { id: 2, text: 'Build a To-Do App', completed: true },
    ];
    res.json(todos);  // Send JSON response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
