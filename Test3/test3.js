// Variables
const form = document.querySelector("form");
const toggleButton = document.getElementById("toggleButton");
const taskTemplate = document.getElementById("new_todo_form");
const input = document.querySelector("#new_todo");
const listTemplate = document.getElementById("rootLi");
const taskList = document.getElementById("taskList");
const summaryButtons = document.getElementById("summaryButtons");
//const summaryButtons = document.querySelectorAll(".summary");
const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const clearButton = document.getElementById("clearButton");
const toDoTotal = document.getElementById("toDoTotal");

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
    taskList.append(taskElement);

    const button = taskElement.querySelector("button");
    const checkbox = taskElement.querySelector("input[type=checkbox]");
    const label = taskElement.querySelector("label");

    counter++;
    itemsLeft++;
    input.value = "";

    showButton(toggleButton);
    showButton(summaryButtons);

    printToDos(counter);

    button.onclick = () => {
        taskElement.remove();
        counter--;
        
        if (button.checked === false)
        {
            itemsLeft--;
        }
        printToDos(counter);
        if (counter === 0) {
            hideButton(toggleButton);
        }
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
        //hideButton(toggleButton);
        hideButton(summaryButtons);
    }

    else if (counter === 1) {
        toDoTotal.textContent = itemsLeft + " item left";
    }

    else {
        toDoTotal.textContent = itemsLeft + " items left";
    }
}

function showButton(button){
    button.hidden = false;
}

function hideButton(button){
    button.hidden = true;
}

function completeToDo(checkbox, label) {
    if (checkbox.checked === true) {
        label.style.textDecoration = "line-through";
        //counter--;                                        TEST
        //printToDos(counter);
        itemsLeft--;
        showButton(clearButton);
    }
    else {
        label.style.textDecoration = "none";
        //counter++;                                        TEST
        itemsLeft++;

        let currentCheckboxes = document.querySelectorAll("input[type=checkbox]")
        let checkBoxCount = 0;
        
        for (let c of currentCheckboxes) {
            if (c.checked === true)
            {
                checkBoxCount++
            }
        }

        if (checkBoxCount === 0)
        {
        hideButton(clearButton);
        }
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