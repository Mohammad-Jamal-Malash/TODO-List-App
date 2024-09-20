const deleteTask = async (taskId) => {
    try {
        // get all tasks from local storage
        let tasks = JSON.parse(localStorage.getItem("todos")) || [];
        // delete the task with the given taskId from the tasks array
        tasks = tasks.filter(task => task.id !== taskId);
        // reflect the changes in the local storage
        localStorage.setItem("todos", JSON.stringify(tasks));
        // get the task item from the DOM
        let taskItem = document.getElementById(`task-${taskId}`);
        // remove the task item from the DOM
        if (taskItem) {
            taskItem.remove();
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
    }
};


// api call to delete a task
// const deleteTask = async (taskId) => {
//     try {
//         const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
//             method: "DELETE"
//         });
//         if (response.ok) {
//             const taskItem = document.getElementById(`task-${taskId}`);
//             const tasks = JSON.parse(localStorage.getItem("tasks"));
//             tasks = tasks.filter(task => task.id !== taskId);
//             localStorage.setItem("tasks", JSON.stringify(tasks));
//             if (taskItem) {
//                 taskItem.remove();
//             }
//         } else {
//             throw new Error("Failed to delete task.");
//         }
//     } catch (error) {
//         console.error("Error deleting task:", error);
//         alert("Failed to delete task. Please try again.");
//     }
// };
