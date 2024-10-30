import "./index.css";
import localforage from "localforage";
import SingleTask from "./Components/SingleTask";
import { titleCase, randomID } from "./utils";

const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-user-input]");
const taskContainerEl = document.querySelector("[data-task-container]");

let state = [];

localforage.setDriver(localforage.LOCALSTORAGE)

function updateLocal() {
  localforage.setItem("tasks",state)
}

function toggleCompleted(id) {
  console.log(id);
  state = state.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
}

localforage.getItem("tasks").then((data) => {
  state = data || [];
  renderTask();
})


//Mark:Render
function renderTask() {
  taskContainerEl.innerHTML = "";
  const frag = document.createDocumentFragment();
  state.forEach((task) => {
    frag.appendChild(SingleTask(task.task, task.isCompleted, task.id));
  });
  taskContainerEl.appendChild(frag);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputEl.value) return;
  if (inputEl === ":clearAll") return clearTasks();
  const newTask = {
    task: titleCase(inputEl.value),
    isCompleted: false,
    id: randomID(),
  };
  state.unshift(newTask);
  // localforage.setItem("tasks", state)
  renderTask();
  updateLocal();
  inputEl.value = "";
});

taskContainerEl.addEventListener("click", (e) => {
  toggleCompleted(e.target.id);
  state.sort((a, b) => a.isCompleted - b.isCompleted);
  // localforage.setItem("tasks", state);
  updateLocal()
  renderTask();
});

function clearTasks() {
  state.length = 0;
  localforage.setItem("tasks", state);
  renderTask()
  inputEl.value = "";

}

const showYear = document.querySelector(".show-year");
showYear.textContent = new Date().getFullYear();
