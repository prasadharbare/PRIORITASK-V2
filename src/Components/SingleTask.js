export default function (text, isCompleted, id) {
  const label = document.createElement("label");
  label.classList.add("label", "cursor-pointer");
  if (isCompleted) {
    label.classList.add("bg-slate-200", "rounded", "p-2");
  }
  label.innerHTML = `
  <span class="label-text">${text}</span>
  <input type="checkbox" ${
    isCompleted && "checked"
  } class="checkbox rounded-2xl" id=${id} />`;
  return label;
}
