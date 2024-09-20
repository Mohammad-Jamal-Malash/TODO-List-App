document.getElementById('search-task').oninput = function searchTasks() {
    const searchInput = document.getElementById('search-task').value.trim().toLowerCase();
    let TODOs = document.getElementById('taskList').children;

    for (let i = 1; i < TODOs.length; i++) {
        let taskText = TODOs[i].querySelector('.taskText').innerText.toLowerCase();
        if (!taskText.includes(searchInput)) {
            TODOs[i].style.display = 'none'; // Hide the task if it doesn't match
        } else {
            TODOs[i].style.display = ''; // Show the task if it matches
        }
    }
};
