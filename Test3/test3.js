const form = document.querySelector("form");
const toggleBtn = document.querySelector("button");
const taskTemplate = document.getElementById("new_todo_form");
const input = document.querySelector("#new_todo");
const listTemplate = document.getElementById("rootLi");
const taskList = document.getElementById("taskList");
const summaryButtons = document.getElementById("summaryButtons");
const clearButton = document.getElementById("clearButton");

listTemplate.remove();
delete listTemplate.id;
let counter = 0;

toggleBtn.onclick = event => 
{
    const allCheckboxes = document.querySelectorAll("input[type=checkbox]");

    let count = 0;
    for (let b of allCheckboxes) {

        if (b.checked )
        {
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


form.onsubmit = event => {
    event.preventDefault();
                                                     
    if (input.value !== null && input.value !=="")
    {
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
        
        taskList.appendChild(taskElement);
        const btn = taskElement.querySelector("button");        

        btn.onclick = event => {
            taskElement.remove();
            counter--;
            printToDos(counter);
        }

        counter++;
        input.value = "";

        toggleBtn.hidden = false;
        summaryButtons.hidden = false;

        printToDos(counter);
    };
}

function printToDos(counter){
    if (counter === 0){
        toggleBtn.hidden = true;
        summaryButtons.hidden = true;
    }
    
    else if (counter === 1) {
        document.getElementById("toDoTotal").textContent = counter + " item left";
    }

    else {
        document.getElementById("toDoTotal").textContent = counter + " items left";
    }
}

function completeToDo(){
    if (checkbox.checked == true){
        taskElement.style.textDecoration = "line-through";
        counter--;
        printToDos(counter);
    }

    counter--;
    printToDos(counter);
    clearButton.hidden = false;
}

function showAll(){

}

function showActive(){

}

function showCompleted(){

}

function clearCompleted(){

}