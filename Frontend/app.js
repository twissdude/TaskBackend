
document.getElementById('add-task').addEventListener('click', async () => {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const priority = document.getElementById('task-priority').value;
    const deadline = document.getElementById('task-deadline').value;

    const newTask = { title, description, priority, deadline };

    try {
        const response = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        const data = await response.json();
        console.log('Task created:', data);
        // Refresh the task list here if needed
    } catch (error) {
        console.error('Error:', error);
    }


    

// Fetch tasks
async function fetchTasks() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const tasks = await response.json();
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Priority: ${task.priority}</p>
                <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
                <button class="delete-btn" data-id="${task._id}">Delete</button>
            `;
            tasksList.appendChild(taskElement);
        });

        // Attach delete event listeners
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteTask);
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}


// Delete a task
async function deleteTask(event) {
    const taskId = event.target.getAttribute('data-id');
    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        console.log(result.message); // Log success message

        // Refresh the task list
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Initial fetch of tasks
fetchTasks();

});




// Select DOM elements
const authView = document.getElementById('auth');
const mainView = document.getElementById('main');
const tasksList = document.getElementById('tasks-list');

// Function to show a specific view
function showView(view) {
    authView.classList.toggle('active', view === 'auth');
    mainView.classList.toggle('active', view === 'main');
}

// Check if the user is logged in
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Redirect to the appropriate view
function checkAuth() {
    if (isAuthenticated()) {
        showView('main');
        fetchTasks();
    } else {
        showView('auth');
    }
}

// Handle registration
document.getElementById('register-btn').addEventListener('click', async () => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        alert(data.message || data.error);
    } catch (error) {
        console.error(error);
    }
});

// Handle login
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            checkAuth();
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    checkAuth();
});

// Initial check
checkAuth();







