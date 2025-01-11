import "./index.css";
import localforage from "localforage";
import SingleTask from "./Components/SingleTask";
import { sortBy } from "lodash";
import { titleCase, randomID } from "./utils";

const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-user-input]");
const taskContainerEl = document.querySelector("[data-task-container]");

let state = [];

localforage.setDriver(localforage.LOCALSTORAGE);

function updateLocal() {
  localforage.setItem("tasks", state);
}

function toggleCompleted(id) {
  console.log(id);
  state = state.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });

  updateLocal();
}

localforage.getItem("tasks").then((data) => {
  state = data || [];
  renderTask();
});

// MARK:Rnder
function renderTask() {
  taskContainerEl.innerHTML = "";
  const frag = document.createDocumentFragment();
  state.forEach((task) => {
    frag.appendChild(SingleTask(task.task, task.isCompleted, task.id));
  });
  taskContainerEl.appendChild(frag);
}

//MARK:Listener
//On new task add
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputEl.value) return;
  if (inputEl.value === ":clearall") return clearTasks();
  const newTask = {
    task: titleCase(inputEl.value),
    isCompleted: false,
    id: randomID(),
  };
  state.unshift(newTask);

  updateLocal();
  renderTask();
  inputEl.value = "";
});

//On task toggle
taskContainerEl.addEventListener("click", (e) => {
  toggleCompleted(e.target.id);
  // state.sort((a, b) => a.isCompleted - b.isCompleted);

  state = sortBy(state, ["isCompleted"]);
  updateLocal();
  renderTask();
});

function clearTasks() {
  state.length = 0;

  updateLocal();
  renderTask();
  inputEl.value = "";
}

const showYear = document.querySelector(".show-year");
showYear.textContent = new Date().getFullYear();
