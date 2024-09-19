document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
  
    // Function to fetch tasks from the API
    const fetchTasks = async () => {
      // Show loading spinner
      taskList.innerHTML = '<div class="loading"><div class="spinner"></div>Loading tasks...</div>';
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const data = await response.json();
        // Clear loading indicator and display tasks
        taskList.innerHTML = '';
        displayTasks(data.todos);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        taskList.innerHTML = '<li class="error">Failed to load tasks. Please try again.</li>';
      }
    };
  
    // Function to display tasks in the taskList
    const displayTasks = (tasks) => {
      tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task";
  
        taskItem.innerHTML = `
          <input type="checkbox" class="taskCheckbox" id="status-${task.id}" ${task.completed ? 'checked' : ''} />
          <span class="taskText" contenteditable="false">${task.todo}</span>
          <button class="delete-btn icon" onclick="deleteTask(${task.id})">
            <i class="fas fa-trash"></i>
          </button>
          <button class="edit-btn icon" onclick="editTask(${task.id})">
            <i class="fas fa-edit"></i>
          </button>
        `;
  
        taskList.appendChild(taskItem);
      });
    };

    // Fetch tasks on page load
    fetchTasks();
  });
  