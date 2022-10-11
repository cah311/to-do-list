import render, {
  lists,
  selectedListId,
  clearElement,
  save,
  saveAndRender,
} from "./lists";

export default function listDisplay() {
  const listDisplayContainer = document.querySelector(
    "[data-list-display-container]"
  );
  const listTitleElement = document.querySelector("[data-list-title]");
  const taskContainer = document.querySelector("[data-tasks]");

  const selectedList = lists.find((list) => list.id === selectedListId);

  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
  }

  clearElement(taskContainer);
  renderTasks(selectedList);
  addToTaskList();
  clearCompletet();

  taskContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "input") {
      const selectedList = lists.find((list) => list.id === selectedListId);
      const selectedTask = selectedList.tasks.find(
        (task) => task.id === e.target.id
      );

      selectedTask.complete = e.target.checked;
      save();
      renderTaskCount(selectedList);
    }
  });

  //updateTasks(lists);
}

export function addToTaskList() {
  const newTaskForm = document.querySelector("[data-new-task-form]");
  const newTaskInput = document.querySelector("[data-new-task-input]");
  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = newTaskInput.value;
    if (taskName == null || taskName === "") return;
    const task = createNewTask(taskName);
    newTaskInput.value = null;
    const selectedList = lists.find((list) => list.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
  });
}

function createNewTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [
      {
        id: Date.now().toString(),
        name: name,
        complete: false,
      },
    ],
  };
}

function renderTasks(selectedList) {
  const container = document.querySelector("[data-tasks]");

  selectedList.tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.setAttribute("class", "task");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", task.id);
    checkbox.checked = task.complete;
    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", task.id);
    taskLabel.append(task.name);
    const customCheckbox = document.createElement("span");
    customCheckbox.setAttribute("class", "custom-checkbox");

    container.appendChild(taskElement);
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskLabel);
    taskLabel.appendChild(customCheckbox);
  });
}

export function renderTaskCount(selectedList) {
  const listCountElement = document.querySelector("[data-list-count]");

  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

export function clearCompletet(selectedList) {
  const clearCompleteTasksButton = document.querySelector(
    "[data-clear-complete-tasks-button]"
  );

  clearCompleteTasksButton.addEventListener("click", (e) => {
    selectedList = lists.find((list) => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
    saveAndRender();
  });
}
