// https://www.youtube.com/watch?v=jBmrduvKl5w&t=191s
//Add textcontent= X to button?
// ❌
const list = document.querySelector("#list");
const form = document.querySelector("#new_todo_form");
const input = document.querySelector("#new_todo");
const tasks = [];
let counter = 1;
// let taskId: string = "1"; 
form === null || form === void 0 ? void 0 : form.addEventListener("submit", e => {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        id: counter,
        title: input.value,
        completed: false,
        remove: false,
        createdAt: new Date(),
    };
    console.log('new task object:', newTask);
    tasks.push(newTask);
    addListItem(newTask);
    input.value = "";
});
function addListItem(task) {
    console.log('addListItem called with task:', task);
    const item = document.createElement("li");
    const label = document.createElement("label");
    //     The htmlFor property in HTML is used to associate a label element with an input element. 
    //     It is commonly used to give focus to an input element when the label is clicked.
    // CheckLabel is a newly created label element, and checkbox is a newly created input element. 
    //  The line checkLabel.htmlFor = checkbox-${task.id}; sets the htmlFor attribute of the label to the 
    //  string checkbox-${task.id}, where task.id is the id of the current task object. 
    //  This creates a relationship between the label and input elements such that when the label element
    //   is clicked, the associated input element with an id of checkbox-${task.id} will receive focus.
    // So when the user clicks on the label element, it will toggle the checkbox for the corresponding task.
    const checkLabel = document.createElement("label");
    checkLabel.htmlFor = `checkbox-${task.id}`;
    checkLabel.classList.add("checkbox");
    const checkbox = document.createElement("input");
    checkbox.name = "checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        // console.log(tasks)
    });
    checkLabel.appendChild(checkbox);
    //Create textnode to contain the X-emoji?
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.name = "removeBtn";
    // + counter
    // removebox.style.display = "none"
    // removeBtn.addEventListener ("change", () => {
    //     task.remove = removebox.checked 
    //     item.remove()
    // } )
    const removeLabel = document.createElement("label");
    removeLabel.htmlFor = `removeBtn-${task.id}`;
    removeLabel.classList.add("removeBtn");
    removeLabel.appendChild(removeBtn);
    label.append(checkLabel, task.title, removeLabel);
    item.append(label);
    list.append(item);
    counter++;
    console.log(removeBtn);
}
//# sourceMappingURL=index.js.map