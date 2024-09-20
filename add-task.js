// Add new task
document.addEventListener('DOMContentLoaded', function () {
    const addTask = async () => {
        const taskInput = document.getElementById('taskInput');
        const newTaskText = taskInput.value.trim();

        // Check if the warning already exists
        let existingWarning = document.getElementById('warningMessage');

        if (newTaskText === '') {
            if (!existingWarning) {
                let warning = document.createElement('span');
                warning.id = "warningMessage";
                warning.style.color = 'red';
                warning.style.fontSize = '12px';
                warning.style.alignSelf = "flex-start";
                // this class is for more smother ui for the warnning msg
                warning.className = "showWarning";


                // to put the warning exactly under the input feild
                // we can use this formial (parentContainer-Width - input-Width) / 2;
                // Get the taskInput container width
                let inputContainerWidth = taskInput.getBoundingClientRect().width;

                // get the taskInput parent width
                let inputContainerParentWidth = taskInput.parentNode.getBoundingClientRect().width;
                // the 10 is for the wasted error in calculations
                warning.style.marginLeft = (inputContainerParentWidth - inputContainerWidth) / 2 - 10 + 'px';
                warning.innerHTML = "Empty Tasks is Not Allowed";
                taskInput.after(warning);
             // Trigger the active class after the element is inserted to trigger the transition
            setTimeout(() => {
                warning.classList.add('active');
            }, 0);

            // Automatically hide after 3 seconds
            setTimeout(() => {
                warning.classList.remove('active');
                setTimeout(() => {
                    warning.remove(); // Completely remove after transition ends
                }, 500); // This time should match the transition duration
            }, 3000);
        }
            return;
        }

        // we will diaple the button to prevent the user from adding a new task
        // becuse our id dependes on the length of the tasks list
        // if the internet is slow and the user clicked more than one it will
        // lead to repeated id which will case problems
        // like when the user want to delete an item
        // all the tasks with the same id will be deleted,
        disableBtn(document.getElementById('addTaskBtn'));


        let response = await fetch('https://dummyjson.com/todos/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo: newTaskText,
                completed: false,
                userId: 123,
            })
        });
        let data = await response.json();
        console.log(data);
        if (data) {
            // Get tasks from local storage
            let tasks = JSON.parse(localStorage.getItem('todos')) || [];
            // Create a new task object
            const newTask = {
                id: (tasks.length > 0 ? tasks[tasks.length -1].id+1 :1) ,
                todo: data.todo,
                completed: data.completed,
                userId: data.userId,
            };

            // Add new task to the array
            tasks.push(newTask);

            // Save tasks back to local storage
            localStorage.setItem('todos', JSON.stringify(tasks));

            // Clear the input field
            taskInput.value = '';

            // Display the new task in the list
            displayTasks([newTask]); // Only display the new task
        }
        else {
            alert("Faild To add The Task");
        }
        // after every thing is done reEnable the button
        enableBtn(document.getElementById('addTaskBtn'));
    };

    // Event listener for Add Task button
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
});

const disableBtn = (btn) => {
    btn.disabled = true;
    // can be done using innerHTML just for fun;
    let sp = document.createElement('div');
    sp.classList.add('spinner');
    sp.classList.add('spinnerBtn');
    btn.removeChild(btn.firstChild);
    btn.appendChild(sp);
}

const enableBtn = (btn) => {
    btn.disabled = false;
    btn.innerHTML = 'Add'
}

