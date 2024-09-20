let TODOs = JSON.parse(localStorage.getItem('todos'));
const totalTODOs = () => {
    document.getElementById("totalTasks").innerHTML = TODOs.length;
}

const completedTODOs = () => {
    let completed = TODOs.filter(todo => todo.completed == true);
    document.getElementById("completedTasksCount").innerHTML = completed.length;
}
const pendingTODOs = () => {
    let pending = TODOs.filter(todo => todo.completed == false);
    document.getElementById("pendingTasksCount").innerHTML = pending.length;
}
totalTODOs();
completedTODOs();
pendingTODOs();

// adding an event that cheaks if any thing changed in the dom and
// re-calculate the values:

// The function to run when changes are observed
function domChanged() {
    TODOs = JSON.parse(localStorage.getItem('todos'));
    totalTODOs();
    completedTODOs();
    pendingTODOs();
}

// Select the target node to observe
const targetNode = document.getElementById('taskList');

// Create a new MutationObserver instance and pass the callback function
const observer = new MutationObserver(domChanged);

// Define what to observe (childList, subtree, attributes, etc.)
const config = {
    attributes: true,    // Observe attribute changes
    childList: true,     // Observe addition/removal of child elements
    subtree: true        // Observe changes in the entire subtree of the target node
};

// Start observing the target node for configured mutations
observer.observe(targetNode, config);