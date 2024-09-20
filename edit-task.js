const editTask = async (taskId) => {
    try {
        // Get the task element
        const taskItem = document.getElementById(`task-${taskId}`);
        const taskTextSpan = taskItem.querySelector('.taskText');
        
        // Make the text editable
        taskTextSpan.contentEditable = true;
        taskTextSpan.focus();

        // a limit for the chars can be added 

        // Add an event listener for the Enter key to save the changes
        taskTextSpan.addEventListener('keydown', async function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the Enter key from adding a new line
                taskTextSpan.contentEditable = false; // Disable editing

                // Get the updated text
                const updatedText = taskTextSpan.textContent.trim();

                // Get tasks from local storage
                let tasks = JSON.parse(localStorage.getItem('todos')) || [];

                // Find the task and update its text locally
                let task = tasks.find(task => task.id === taskId);
                if (task) {
                    task.todo = updatedText;
                    localStorage.setItem('todos', JSON.stringify(tasks));

                    // Update task on the server (optional) and the await can be
                    // removed here
                    await fetch(`https://dummyjson.com/todos/${taskId}`, {
                        method: 'PUT', /* or PATCH */
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ todo: updatedText })
                    });
                }
            }
        });
    } catch (error) {
        alert("Error: " + error);
    }
};
