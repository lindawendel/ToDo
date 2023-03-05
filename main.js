// Variables
const form = document.querySelector("form");
const toggleButton = document.querySelector("#toggleButton");
const input = document.querySelector("#new_todo");
const listTemplate = document.querySelector("#rootLi");
const originalTaskList = document.querySelector("#taskList");
const taskElements = document.querySelectorAll("#rootli li");
const summaryButtons = document.querySelector("#summaryButtons");
const allButton = document.querySelector("#allButton");
const activeButton = document.querySelector("#activeButton");
const completedButton = document.querySelector("#completedButton");
const clearButton = document.querySelector("#clearButton");
const toDoTotal = document.querySelector("#toDoTotal");

let allCheckboxes = document.querySelectorAll("input[type=checkbox]");
let activeButtonRef = null;

listTemplate.remove();
listTemplate.removeAttribute("id");

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

    const taskElement = listTemplate.cloneNode(true);

    taskElement.querySelector("label").textContent = input.value;
    taskElement.removeAttribute("hidden");

    originalTaskList.append(taskElement);

    const deleteButton = taskElement.querySelector("#deleteButton");
    const checkbox = taskElement.querySelector("input[type=checkbox]");
    const label = taskElement.querySelector("label");
    const toDoSummary = document.querySelector("#toDoSummary");

    counter++;
    itemsLeft++;
    input.value = "";

    if (counter >= 1) {
        form.style.borderBottom = "1px solid lightgray";
    }

    showButton(toggleButton);
    showButton(allButton);
    showButton(activeButton);
    showButton(completedButton);
    toDoTotal.hidden = false;
    toDoSummary.hidden = false;

    printItems(counter, itemsLeft);

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
        toDoSummary.hidden = true;
        form.style.borderBottom = "none";
    }
}

function printItems(counter, itemsLeft) {

    if (counter === 0) {
        hideButton(toggleButton);
        hideButton(allButton);
        hideButton(activeButton);
        hideButton(completedButton);
        hideButton(clearButton);

        if (itemsLeft === 0) {
            toDoTotal.textContent = itemsLeft + " items left";
            toDoTotal.hidden = true;
            form.style.borderBottom = "none";
        }
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

function showAll(event) {
    const taskElements = document.querySelectorAll("#taskList li");

    taskElements.forEach(task => {
        {
            let checkBox = task.querySelector('input[type="checkbox"]');
            checkBox.parentNode.className = "visible";
        }
    })

    if (activeButtonRef !== null) {
        activeButtonRef.style.border = 'none';
    }

    const clickedButton = event.target;
    clickedButton.style.border = '1px solid rgba(175, 47, 47, 0.15)';
    activeButtonRef = clickedButton;
}

function showActive(event) {
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

    if (activeButtonRef !== null) {
        activeButtonRef.style.border = 'none';
    }

    const clickedButton = event.target;
    clickedButton.style.border = '1px solid rgba(175, 47, 47, 0.15)';
    activeButtonRef = clickedButton;
}

function showCompleted(event) {
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

    if (activeButtonRef !== null) {
        activeButtonRef.style.border = 'none';
    }

    const clickedButton = event.target;
    clickedButton.style.border = '1px solid rgba(175, 47, 47, 0.15)';
    activeButtonRef = clickedButton;
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

    if (counter === 0) {
        toDoSummary.hidden = true;
    }

    hideButton(clearButton);
    printItems(counter, itemsLeft);
}