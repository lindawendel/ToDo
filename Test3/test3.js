// Variables
const form = document.querySelector("form");
const toggleButton = document.getElementById("toggleButton");
const taskTemplate = document.getElementById("new_todo_form");
const input = document.querySelector("#new_todo");
const listTemplate = document.getElementById("rootLi");
const taskList = document.getElementById("taskList");
const summaryButtons = document.getElementById("summaryButtons");
const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const clearButton = document.getElementById("clearButton");
const toDoTotal = document.getElementById("toDoTotal");

listTemplate.remove();
delete listTemplate.id;
let counter = 0;


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

    // taskElement.childNodes[0]= input.value;
    // taskElement.childNodes[1].textContent = input.value;
    // taskElement.childNodes[2] = input.button;

    taskElement.querySelector("label").textContent = input.value;

    // taskElement.id = "task" + counter;
    // taskElement.childNodes[0].id = "input" + counter;
    // taskElement.childNodes[1].id = "label" + counter;
    // taskElement.childNodes[2].id= "button" + counter;

    taskElement.removeAttribute("hidden");
    taskList.append(taskElement);

    const button = taskElement.querySelector("button");
    const checkbox = taskElement.querySelector("input[type=checkbox]");
    const label = taskElement.querySelector("label");

    counter++;
    input.value = "";

    toggleButton.hidden = false;
    summaryButtons.hidden = false;

    printToDos(counter);

    button.onclick = () => {
        taskElement.remove();
        counter--;
        printToDos(counter);
    }

    checkbox.addEventListener("change", () => {
        completeToDo(checkbox, label)
    })
}

function printToDos(counter) {
    //funkar inte. counter visar 1
    /* if (counter === 0 && checkbox.checked === true){
        toDoTotal.textContent = counter + " items left";
    } */

    if (counter === 0) {
        toggleButton.hidden = true;
        summaryButtons.hidden = true;
    }

    else if (counter === 1) {
        toDoTotal.textContent = counter + " item left";
    }

    else {
        toDoTotal.textContent = counter + " items left";
    }
}

function completeToDo(checkbox, label) {
    if (checkbox.checked === true) {
        label.style.textDecoration = "line-through";
        counter--;
        //printToDos(counter);
        clearButton.hidden = false;
    }
    else {
        label.style.textDecoration = "none";
        counter++;
        clearButton.hidden = true;
    }

    // counter--;
    printToDos(counter);
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
        }
    }

    else {
        for (let b of allCheckboxes) {
            b.checked = true;
        }
    }
}

function showAll() {
    printToDos(counter);
}

function showActive() {

}

function showCompleted() {

}

function clearCompleted() {

}