import "./index.css";
import SingleTask from "./Components/SingleTask";
import { titleCase } from "./utils";

const showYear = document.querySelector(".show-year");
const inputEl = document.querySelector("[data-user-input]");
const formEl = document.querySelector("[data-form]");
const taskContainerEl = document.querySelector("[data-task-container]");
showYear.textContent = new Date().getFullYear();

function renderTask() {
  taskContainerEl.innerHTML = "";
  const frag = document.createDocumentFragment();
  tasks.forEach((task) => {
    frag.appendChild(SingleTask(task.text, task.isCompleted));
  });
  taskContainerEl.appendChild(frag);
}

let state = [];
console.log(state);

function toggleCopmleted(id) {
  state.map((task) => {
    if (id === task.id) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
  console.log(state);
}  


formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputEl.value) return;
  const newTask = {
    task: titleCase(inputEl.value),
    isCompleted: false,
    id: state.length,
  };
  state.unshift(newTask);
  renderTask();

  inputEl.value = "";
});
taskContainerEl.addEventListener("click", (e) => {
  console.log(e.target.id);
});
   
   