// localStorage.removeItem("todos");
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");

    // Check if the TODOS are already in the local storage
    const cachedTasks = localStorage.getItem("todos");

    // if exists, display the tasks
    if (cachedTasks) {
        displayTasks(JSON.parse(cachedTasks));
        return;
    }
    // by using cashed tasks, we can provide a more responsive experience to the user
    // while the tasks are being fetched from the API
    // and then fetch the tasks from the API and update the list
    // this insures that the user always sees the most up-to-date tasks
    // we can also use the cached tasks to display the tasks when the user is offline

    // we can optimize the user experience by adding some amount of time
    // and after this time we can fetch the tasks from the API and 
    //update the local storage with the new tasks.

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        // Show loading spinner
        taskList.innerHTML = '<div class="loading"><div class="spinner"></div>Loading tasks...</div>';
        try {
            const response = await fetch("https://dummyjson.com/todos");
            const data = await response.json();
            // Save tasks to local storage
            localStorage.setItem("todos", JSON.stringify(data.todos));
            // Clear loading indicator and display tasks
            taskList.innerHTML = '<input type="search" id = "search-task" placeholder="Search Task ..."/>';
            displayTasks(data.todos);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            taskList.innerHTML = '<li class="error">Failed to load tasks. Please try again.</li>';
        }
    };

    // Fetch tasks on page load
    fetchTasks();
});

// Function to display tasks in the taskList
const displayTasks = (tasks) => {
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task";
        taskItem.id = `task-${task.id}`;
        taskItem.innerHTML = `
            <input type="checkbox" class="taskCheckbox" id="status-${task.id}" ${task.completed ? 'checked' : ''} />
            <span class="taskText" contenteditable="false">${task.todo}</span>
            <button class="delete-btn icon">
              <i class="fas fa-trash"></i>
            </button>
            <button class="edit-btn icon">
              <i class="fas fa-edit"></i>
            </button>
          `;

        // we will attach event listeners for the following actions
        // 1. Toggle task status
        // 2. Delete task
        // 3. Edit task

        // 1. Toggle task status
        taskItem.querySelector('.taskCheckbox').addEventListener('change', () => toggleStatus(task.id));
        // 2. Delete task
        taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
        // 3. Edit task
        taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));

        if (task.completed)
            taskItem.querySelector('.taskText').style.textDecoration = 'line-through';
        taskList.appendChild(taskItem);
    });
};
