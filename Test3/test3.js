const form = document.querySelector("form");
const taskTemplate = document.getElementById("new_todo_form");
const input = document.querySelector("#new_todo");
const listTemplate = document.getElementById("rootLi");
const taskList = document.getElementById("taskList");


const listTemplate2 = document.getElementById("rootLi");

listTemplate.remove();
delete listTemplate.id;
let counter = 1;


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
        }

        counter++;
        input.value = "";
    };
}




