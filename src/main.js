import "./index.css";
import { titleCase } from "./utils";

const showYear = document.querySelector(".show-year");
const inputEl = document.querySelector("[data-user-input]");
const formEl = document.querySelector("[data-form]");
const tasks = []

showYear.textContent = new Date().getFullYear();

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputEl.value) return; //guard clause
    const newTask={
        tasks:titleCase(inputEl.value),
            isCompleted: false,
            id:tasks.length,
    }
});


    