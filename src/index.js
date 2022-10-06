import _ from "lodash";
import "./styles/style.css";
import lists from "./lists.js";

// Creates grid for layout of page
function pageGrid() {
  // container for entire page
  const gridContainer = document.createElement("div");
  gridContainer.setAttribute("id", "page-grid");

  // header grid cell
  const headerSection = document.createElement("div");
  headerSection.setAttribute("class", "grid-section");
  headerSection.setAttribute("id", "header-section");

  // list grid cell
  const listSection = document.createElement("div");
  listSection.setAttribute("class", "grid-section");
  listSection.setAttribute("id", "list-section");

  // task section grid cell
  const taskSection = document.createElement("div");
  taskSection.setAttribute("class", "grid-section");
  taskSection.setAttribute("id", "task-section");

  // footer grid cell
  const footerSection = document.createElement("div");
  footerSection.setAttribute("class", "grid-section");
  footerSection.setAttribute("id", "footer-section");

  // append to page
  gridContainer.appendChild(headerSection);
  gridContainer.appendChild(listSection);
  gridContainer.appendChild(taskSection);
  gridContainer.appendChild(footerSection);

  return gridContainer;
}

document.body.append(pageGrid());

// appends any content to header section
function headerContent() {
  const headerContainer = document.getElementById("header-section");
  const headerContent = document.createElement("div");
  headerContent.innerText = "Header";
  headerContainer.appendChild(headerContent);

  return headerContainer;
}

headerContent();

// appends content to list section
function listContent() {
  const listContainer = document.getElementById("list-section");

  const listContent = document.createElement("div");
  listContent.setAttribute("id", "lists-container");

  const allListContainer = document.createElement("div");
  allListContainer.setAttribute("class", "all-lists");
  allListContainer.setAttribute("id", "all-list-container");

  const allListTitle = document.createElement("h2");
  allListTitle.setAttribute("class", "task-list-title");
  allListTitle.innerText = "Lists";

  const allList = document.createElement("ul");
  allList.setAttribute("class", "task-list");

  const firstList = document.createElement("li");
  firstList.setAttribute("class", "list-name");
  firstList.innerText = "First List";

  const newList = document.createElement("form");
  newList.setAttribute("action", "");
  const newListInput = document.createElement("input");
  newListInput.setAttribute("type", "text");
  newListInput.setAttribute("class", "new-list");
  newListInput.setAttribute("placeholder", "new-list-name");

  const newListButton = document.createElement("button");
  newListButton.setAttribute("class", "list-button");
  newListButton.innerText = "New List";

  const btn = document.createElement("button");
  btn.innerHTML = "Click me and check the console!";
  btn.onclick = lists;

  listContainer.appendChild(listContent);

  listContent.appendChild(allListContainer);
  allListContainer.appendChild(allListTitle);
  allListContainer.appendChild(allList);
  allListContainer.appendChild(firstList);
  allListContainer.appendChild(newList);
  newList.appendChild(newListInput);
  newList.appendChild(newListButton);

  listContent.appendChild(btn);

  return listContainer;
}

listContent();

// appends content to task section
function tasksContent() {
  const taskContainer = document.getElementById("task-section");
  const taskContent = document.createElement("div");
  taskContent.innerText = "Tasks";

  const currentTaskList = document.createElement("div");
  currentTaskList.setAttribute("class", "todo-list");

  const taskListHeader = document.createElement("div");
  taskListHeader.setAttribute("class", "todo-list-header");

  const taskListTitle = document.createElement("h2");
  taskListTitle.setAttribute("class", "todo-list-title");
  taskListTitle.innerHTML = "First List";
  const taskCount = document.createElement("p");
  taskCount.setAttribute("class", "todo-count");
  taskCount.innerText = "3 tasks remaining";

  const taskListBody = document.createElement("div");
  taskListBody.setAttribute("class", "todo-list-body");

  const todos = document.createElement("div");
  todos.setAttribute("class", "todos");
  const task1 = document.createElement("div");
  task1.setAttribute("class", "task");
  const task1Input = document.createElement("input");
  task1Input.setAttribute("type", "checkbox");
  task1Input.setAttribute("id", "task-1");
  const task1Label = document.createElement("label");
  task1Label.setAttribute("for", "task-1");
  task1Label.innerText = "Banana";
  const customCheckbox = document.createElement("span");
  customCheckbox.setAttribute("class", "custom-checkbox");

  const taskCreator = document.createElement("div");
  taskCreator.setAttribute("class", "new-task-creator");

  const deleteTask = document.createElement("div");
  deleteTask.setAttribute("class", "delete-task");

  taskContainer.appendChild(taskContent);

  taskContent.appendChild(currentTaskList);
  currentTaskList.appendChild(taskListHeader);
  taskListHeader.appendChild(taskListTitle);
  taskListHeader.appendChild(taskCount);
  currentTaskList.appendChild(taskListBody);
  taskListBody.appendChild(todos);
  todos.appendChild(task1);
  task1.appendChild(task1Input);
  task1.appendChild(task1Label);
  task1Label.appendChild(customCheckbox);
  taskListBody.appendChild(taskCreator);
  taskListBody.appendChild(deleteTask);

  return taskContainer;
}

tasksContent();

// appends content to footer section
function footerContent() {
  const footerContainer = document.getElementById("footer-section");
  const footerContent = document.createElement("div");
  footerContent.innerText = "Footer";
  footerContainer.appendChild(footerContent);

  return footerContainer;
}

footerContent();
