const toggleStatus = async (taskId) => {

    // Show the spinner overlay
    overlay.classList.remove("hidden");

    try {
        // first we must know the prev status of the task first
        let taskObj = await (await fetch(`https://dummyjson.com/todos/${taskId}`)).json();

        // we could remove the await to make the user see the changes quickly and
        // make the changes over the server be quite, (please commint over this if this
        // is considerd a good action).
        
        let response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: !taskObj.completed,
            })
        });

        // here we must check for the respoce first but for the user expierince i dont think
        // it is a good idea.

        if (response) {
            // then update it in the local storage
            let tasks = JSON.parse(localStorage.getItem('todos')) || [];
            let item;
            for (t of tasks) {
                if (t.id == taskId) {
                    t.completed = !t.completed;
                    item = t;
                    break;
                }
            }
            localStorage.setItem('todos', JSON.stringify(tasks));

            let taskItem = document.getElementById(`task-${taskId}`);
            if (item.completed)
                taskItem.querySelector('.taskText').style.textDecoration = 'line-through';
            else
                taskItem.querySelector('.taskText').style.textDecoration = 'none';
        } else {
            alert("Somthing went Wrong")
        }
    } catch (error) {
        alert("Network error || Fetch Error" + error);
        // here to preent the local changes.
        return;
    } finally {
        // Hide the spinner overlay
        overlay.classList.add("hidden");
    }
}
