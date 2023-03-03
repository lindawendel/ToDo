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
allButton.addEventListener("click", showAll);
activeButton.addEventListener("click", showActive);
completedButton.addEventListener("click", showCompleteds);
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
    
    printItems(counter, itemsLeft);

    button.onclick = () => {

        if (checkbox.checked === false)
        {
            itemsLeft--;
        }

        taskElement.remove();
        counter--;

        printItems(counter, itemsLeft);
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


function printItems(counter, itemsLeft) {

    if (counter === 0) {
        //hideButton(toggleButton);
        hideButton(summaryButtons);
    }

    else if (itemsLeft === 1) {
        toDoTotal.textContent = itemsLeft+ " item left";
    }

    else {
        toDoTotal.textContent = itemsLeft+ " items left";
    }
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
            b.nextElementSibling.style.textDecoration = "none";
          
            itemsLeft++;
        }
    }

    else {
        for (let b of allCheckboxes) {
            b.checked = true;
            b.nextElementSibling.style.textDecoration = "line-through";
       
        itemsLeft--;
        showButton(clearButton);
        }
    }

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
    
    printItems(counter, itemsLeft)
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

    printItems(counter, itemsLeft);
}


function showButton(button){
    button.hidden = false;
}

function hideButton(button){
    button.hidden = true;
}

function showAll() {
    printItems(counter);
    
}

function showActive(originalTaskList) {        
    // const activeTaskList = originalTaskList.cloneNode(true);    

    // for (let t of activeTaskList) {
    //         if(t.checkbox.checked === true) {
    //             activeTaskList.remove(t);
    //         }  

    // }
    
    // const taskElements = activeTaskList.querySelectorAll("#rootli li");

    // taskElements.forEach(function(taskElement){
    //     if(taskElement.checkbox.checked === true){
    //         taskList.remove(taskElement);
    //     }
    // })

}

function showCompleted(originalTaskList) {
    // const completedTaskList = originalTaskList.cloneNode(true);

    // const taskElements = completedTaskList.querySelectorAll("#rootLi li");

    // taskElements.forEach(function(taskElement){
    //     if(taskElement.checkbox.checked === false){
    //         taskList.remove(taskElement);
    //     }
    // })

}

function clearCompleted() {

}

