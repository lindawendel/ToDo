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
//const summaryButtons = document.querySelectorAll(".summary");
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
allButton.addEventListener("click", showAll(originalTaskList));
activeButton.addEventListener("click", showActive(originalTaskList));
completedButton.addEventListener("click", showCompleted(originalTaskList));
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

function removeToDo(){
    
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
        toDoTotal.textContent = counter + " item left";
    }

    else {
        toDoTotal.textContent = counter + " items left";
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

function clearTaskList(taskList){
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

}

function showAll() {
    printToDos(counter);
}

function showActive(originalTaskList) {        
    const activeTaskList = originalTaskList.cloneNode(true);    

    // for (let t of activeTaskList) {
    //         if(t.checkbox.checked === true) {
    //             activeTaskList.remove(t);
    //         }  

    // }
    
    const taskElements = activeTaskList.querySelectorAll("#rootli li");

    taskElements.forEach(function(taskElement){
        if(taskElement.checkbox.checked === true){
            taskList.remove(taskElement);
        }
    })

}

function showCompleted(originalTaskList) {
    const completedTaskList = originalTaskList.cloneNode(true);

    const taskElements = completedTaskList.querySelectorAll("#rootLi li");

    taskElements.forEach(function(taskElement){
        if(taskElement.checkbox.checked === false){
            taskList.remove(taskElement);
        }
    })

}

function clearCompleted() {

}