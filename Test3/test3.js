// Variables
const form = document.querySelector("form");
const toggleButton = document.querySelector("#toggleButton");

//Används inte?!
//const taskTemplate = document.querySelector("#new_todo_form"); 

const input = document.querySelector("#new_todo");
const listTemplate = document.querySelector("#rootLi");
const originalTaskList = document.querySelector("#taskList");
const taskElements = document.querySelectorAll("#rootli li");
const summaryButtons = document.querySelector("#summaryButtons");
//const summaryButtons2 = document.querySelectorAll(".summary");
const allButton = document.querySelector("#allButton");
const activeButton = document.querySelector("#activeButton");
const completedButton = document.querySelector("#completedButton");
const clearButton = document.querySelector("#clearButton");
const toDoTotal = document.querySelector("#toDoTotal");


let allCheckboxes = document.querySelectorAll("input[type=checkbox]");

listTemplate.remove();
delete listTemplate.id;
let counter = 0;
let itemsLeft = 0;


// Events
toggleButton.addEventListener("click", toggleCheckboxes);
allButton.addEventListener("click", showAll);
activeButton.addEventListener("click", showActive);
completedButton.addEventListener("click", showCompleted);
clearButton.addEventListener("click", clearCompleted);

form.onsubmit = event => {
    event.preventDefault();

    if (input.value !== null && input.value !== "") {
        addToDo();
    };
}


// Functions
function addToDo() {

    // Clone the question template in the HTML and insert the question prompt.
    const taskElement = listTemplate.cloneNode(true);

    taskElement.querySelector("label").textContent = input.value;

    taskElement.removeAttribute("hidden");
    originalTaskList.append(taskElement);

    const deleteButton = taskElement.querySelector("#deleteButton");
    const checkbox = taskElement.querySelector("input[type=checkbox]");
    const label = taskElement.querySelector("label");

    counter++;
    itemsLeft++;
    input.value = "";

    showButton(toggleButton);
    showButton(allButton);
    showButton(activeButton);
    showButton(completedButton);
  

    printItems(counter, itemsLeft); //printToDos(counter);

    deleteButton.onclick = () => {

        removeToDo(checkbox, taskElement);

    }

    checkbox.addEventListener("change", () => {
        completeToDo(checkbox, label)
    })
}

function removeToDo(checkbox, taskElement) {

    if (checkbox.checked === false) {
        itemsLeft--;
    }

    taskElement.remove();
    counter--;

    printItems(counter, itemsLeft);
    if (counter === 0) {
        hideButton(toggleButton);
    }
}

function printItems(counter, itemsLeft) {//printToDos(counter) {

    if (counter === 0) {
        hideButton(toggleButton);
        hideButton(allButton);
        hideButton(activeButton);
        hideButton(completedButton);
        hideButton(clearButton);
        if (itemsLeft === 0)
        {
            toDoTotal.hidden;
        }
    }
    
    else if (itemsLeft === 0){

    }

    else if (itemsLeft === 1) {
        toDoTotal.textContent = itemsLeft + " item left";
    }

    else {
        toDoTotal.textContent = itemsLeft + " items left";
    }
}

function showButton(button) {
    button.hidden = false;
}

function hideButton(button) {
    button.hidden = true;
}

function completeToDo(checkbox, label) {
    if (checkbox.checked === true) {
        label.style.textDecoration = "line-through";

        itemsLeft--;
        showButton(clearButton);
    }
    else {
        label.style.textDecoration = "none";

        itemsLeft++;

        let currentCheckboxes = document.querySelectorAll("input[type=checkbox]")
        let checkBoxCount = 0;

        for (let c of currentCheckboxes) {
            if (c.checked === true) {
                checkBoxCount++
            }
        }

        if (checkBoxCount === 0) {
            hideButton(clearButton);
        }
    }

    printItems(counter, itemsLeft);
}

function toggleCheckboxes() {
    const allCheckboxes = document.querySelectorAll("input[type=checkbox]");

    let count = 0;

    for (let b of allCheckboxes) {
        if (b.checked) {
            count++;
        }
    }

    if (count === allCheckboxes.length) {
        for (let b of allCheckboxes) {
            b.checked = false;

            completeToDo(b, b.nextElementSibling)
        }
    }

    else {
        itemsLeft = itemsLeft + count

        for (let b of allCheckboxes) {
            b.checked = true;

            completeToDo(b, b.nextElementSibling)
        }
    }
}

function showAll() {
    const taskElements = document.querySelectorAll("#taskList li");

    taskElements.forEach(task => {
        {
            let checkBox = task.querySelector('input[type="checkbox"]');
            checkBox.parentNode.className = "visible";
        }
    })
}

function showActive() {

    const taskElements = document.querySelectorAll("#taskList li");

    taskElements.forEach(task => {
        let checkBox = task.querySelector('input[type="checkbox"]');

        if (checkBox.checked) {
            checkBox.parentNode.className = "invisible";
        }
        else {
            checkBox.parentNode.className = "visible";
        }
    })    
}

function showCompleted() {

    const taskElements = document.querySelectorAll("#taskList li");

    taskElements.forEach(task => {
        let checkBox = task.querySelector('input[type="checkbox"]');

        if (!checkBox.checked) {
            checkBox.parentNode.className = "invisible";
        }
        else {
            checkBox.parentNode.className = "visible";
        }
    })
}

function clearCompleted() {

    const taskElements = document.querySelectorAll("#taskList li");

    taskElements.forEach(task => {
        let checkBox = task.querySelector('input[type="checkbox"]');

        if (checkBox.checked) {
            task.remove();
            counter--;
        }
    })    
    printItems(counter, itemsLeft);
}