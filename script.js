// Selecting the necessary elements from the HTML document
const inputField = document.querySelector('#input-field');
const addBtn = document.querySelector('#add-btn');
const todosList = document.querySelector('#todos-list');
const countValue = document.querySelector(".count-value");

// Initializing the task count variable
let taskCount = 0;

// Function to display the task count
const displayCount = (taskCount) => { countValue.innerText = taskCount; };

// Function to add a new task
function addTask(){
    // To check if the input field is empty.
    if(!inputField.value){
        alert('Please add a task!'); 
        return;
    }

    // This is for creating a new list item and to add it to the todo list
    todosList.innerHTML += '<li><input type="checkbox">' + inputField.value + '<i class="fa fa-close close-btn"></i></li>';
    
    // Clear the input field and update the task count
    inputField.value = '';
    taskCount+=1;
    displayCount(taskCount);
}

// Function to handle task completion or deletion
function checkTask( event){
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const listItem = event.target.parentElement;
        
        // Toggle the 'completed' class for the list item based on checkbox state
        listItem.classList.toggle('completed', event.target.checked);
        
        // Update the task count based on completed tasks
        updateTaskCount();
    }
    else if (event.target.tagName === 'LI') {
        const checkbox = event.target.querySelector('input[type="checkbox"]');
        if (checkbox) {
            // Toggle the 'checked' property of the checkbox
            checkbox.checked = !checkbox.checked;

            const listItem = event.target;

            // Toggle the 'completed' class for the list item based on checkbox state
            listItem.classList.toggle('completed', checkbox.checked);

            // Update the task count based on completed tasks
            updateTaskCount();
        }
    }
    else if(event.target.tagName === 'I' && event.target.classList.contains('close-btn')){
        // Remove the task when the close button is clicked.
        event.target.parentElement.remove();
        // Update the task count
        taskCount -= 1;
        displayCount(taskCount);
    }
    
}

// Function to update the task count based on completed tasks. 
function updateTaskCount() {
    const completedTasks = document.querySelectorAll('li.completed').length;
    const remainingTasks = taskCount - completedTasks;
    displayCount(remainingTasks);
}

// Add event listeners for adding tasks and checking tasks
addBtn.addEventListener( 'click',addTask);
todosList.addEventListener('click',checkTask);
